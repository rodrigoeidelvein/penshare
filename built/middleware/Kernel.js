import CORS from './CORS';
import Http from "./Http";
class Kernel {
    static init(express) {
        express = CORS.mount(express);
        express = Http.mount(express);
        return express;
    }
}
export default Kernel;
