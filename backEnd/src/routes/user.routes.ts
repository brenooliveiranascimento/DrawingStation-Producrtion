import Express from "express";
import ModuleController from "../controllers/Module.controller";
import checkAdm from "../middlewares/checkWhiteList";
import validateToken from "../middlewares/tokenVerification";
const router = Express.Router();

const moduleController = new ModuleController();

router.use(validateToken);
router.post('/removePremium/:id', moduleController.removePremium);
router.use(checkAdm);
router.post('/getAll', moduleController.getAllUsers);

export default router
