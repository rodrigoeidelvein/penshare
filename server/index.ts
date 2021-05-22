import * as cluster from 'cluster';
const numCPUs = require('os').cpus().length;
import App from './providers/App'

const isDev = process.env.NODE_ENV !== 'production';

if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

    App.loadConfiguration();
} else {
    App.loadServer();
}