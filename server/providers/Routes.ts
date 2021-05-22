import * as passport from 'passport';

import {Application, Router} from "express";

import AuthController from "../controllers/AuthController";
import LikeController from "../controllers/LikeController";
import PadController from "../controllers/PadController";

class Routes {
    private AuthController: AuthController = new AuthController();
    private LikeController: LikeController = new LikeController();
    private PadController: PadController = new PadController();

    public mountApi(express: Application): Application {
        const apiPrefix = 'api';
        const router = Router();

        console.log("Rotas :: Montando rotas da API");

        router.get(apiPrefix,(req, res) => {
            res.send({message: 'hello'})
        })

        // Authentication routes
        router.get('/auth/google/', passport.authenticate('google', { scope: ['email', 'profile'], failureRedirect: '/login' }));
        // router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), SocialController.googleCallback);
        // router.post('/auth/', this.AuthController.login);
        // router.delete('/auth/', this.AuthController.logout);
        // router.get('/auth/me', this.AuthController.me);

        // Like routes
        router.post('/:id/like', this.LikeController.handleLike);

        // Pad routes
        router.get('/user/', this.PadController.getPadsByUserId);
        router.get('/popular/', this.PadController.mostPopularPads);
        router.get('/:id/', this.PadController.getPad);
        router.put('/', this.PadController.updatePad);
        router.post('/', this.PadController.createPad);
        router.delete('/:id', this.PadController.deletePad);

        router.get('/authorization/:id', this.PadController.getAuthorizationsForPad);



        return express.use(`/${apiPrefix}`, router);
    }
}

export default new Routes;