import { Application } from "express";

import CORS from './CORS';
import Http from "./Http";

class Kernel {
    public static init (express: Application): Application {
        express = CORS.mount(express);

        express = Http.mount(express);

        return express;
    }
}

export default Kernel;