var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../models');
const { PadAuthorization } = db;
exports.toRead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { id: padId } = req.params;
    const { id: userId } = req.user;
    try {
        const padAuthorization = yield PadAuthorization.findOne({
            where: {
                padId,
                sharedWith: userId
            },
            include: ["role"]
        });
        if (!padAuthorization) {
            res.status(404).send({ message: "Pad não encontrado" });
        }
        req.user.authorizations = padAuthorization.role;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Erro ao buscar autorização para o documento." });
    }
});
