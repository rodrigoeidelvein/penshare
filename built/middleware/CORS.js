import * as cors from 'cors';
import Locals from "../providers/Locals";
class CORS {
    mount(express) {
        console.log("Iniciando o middleware \'CORS\'");
        const originURL = Locals.config().isDev ? 'http://localhost:3000' : 'https://penshare-stage.herokuapp.com';
        const options = {
            origin: originURL,
            credentials: true
        };
        express.use(cors(options));
        return express;
    }
}
export default new CORS;
