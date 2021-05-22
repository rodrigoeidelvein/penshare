import * as bodyParser from "body-parser";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import Passport from "../providers/Passport";
class Http {
    mount(_express) {
        console.log("Iniciando o middleware \'HTTP\'");
        _express.use(bodyParser.json());
        _express.use(cookieParser());
        _express.disable("x-powered-by");
        _express = Passport.mountPackage(_express);
        return _express;
    }
    serveStatic(_express) {
        console.log("Servindo arquivos estáticos");
        _express.use(express.static(path.resolve(__dirname, '../../react-ui/build')));
        // All remaining requests return the React app, so it can handle routing.
        _express.get('*', function (request, response) {
            response.sendFile(path.resolve(__dirname, '../../react-ui/build', 'index.html'));
        });
        return _express;
    }
}
export default new Http;
