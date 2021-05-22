import {resolve} from "path"

import {config} from "dotenv"

import Express from './Express';

class App {
    public loadConfiguration(): void {
        console.log("Configuração :: Iniciando");

        config({path: resolve(__dirname, "../../.env")});
    }

    public loadServer(): void {
        console.log("Servidor :: Iniciando");

        Express.init();
    }
}

export default new App;