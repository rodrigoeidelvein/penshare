const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
const isUnitTest = process.env.NODE_ENV === 'unitTest';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
const app = express()

if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {

    const originURL = isDev ? 'http://localhost:3000' : 'https://penshare-stage.herokuapp.com'

    const corsOptions= {
        origin: originURL,
        credentials: true
    }

    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(cookieParser());

    require("./routes/auth.routes")(app);
    require("./routes/pad.routes")(app);
    require("./routes/like.routes")(app);
    require("./routes/suggestion.routes")(app);

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    if (!isUnitTest) {
        app.listen(PORT, function () {
            console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
        });
    }
}

module.exports = app;