import { resolve } from "path";
import { config } from "dotenv";
import Express from './Express';
class App {
    loadConfiguration() {
        console.log("Configuração :: Iniciando");
        config({ path: resolve(__dirname, "../../.env") });
    }
    loadServer() {
        console.log("Servidor :: Iniciando");
        Express.init();
    }
}
export default new App;
