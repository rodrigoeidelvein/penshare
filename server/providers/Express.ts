import * as express from 'express';
import Bootstrap from '../middleware/Kernel'
import Http from '../middleware/Http'
import Locals from './Locals';
import Routes from './Routes';

class Express {

    public express: express.Application;

    /**
     * Inicia o servidor express
     */
    constructor() {
        this.express = express();

        this.mountDotEnv();
        this.mountMiddlewares();
        this.mountRoutes();

        console.log(!Locals.config().isDev)
        if (!Locals.config().isDev) {
            this.mountStatic();
        }
    }

    private mountDotEnv(): void {
        this.express = Locals.init(this.express);
    }

    /**
     * Monta os middlewares definidos
     */
    private mountMiddlewares(): void {
        this.express = Bootstrap.init(this.express);
    }

    /**
     * Monta as rotas
     * @private
     */
    private mountRoutes(): void {
        this.express = Routes.mountApi(this.express);
    }

    /**
     * Serve os arquivos estáticos para a build
     */
    private mountStatic(): void {
        this.express = Http.serveStatic(this.express);
    }

    /**
     * Inicia o servidor express
     */
    public init(): void {
        const port: number = 5000;

        this.express.listen(port, (error?: any) => {
            if (error) {
                console.log(`Error: ${error}`);
            }

            console.log(`Server :: Running at port ${port}`);
        })
    }
}

export default new Express();