import Express from "express";
import ModuleController from "../controllers/Module.controller";
import validateAdm from "../middlewares/adm.middleware";
import checkAdm from "../middlewares/checkWhiteList";
import validateToken from "../middlewares/tokenVerification";
const router = Express.Router();

const moduleController = new ModuleController();

router.use(validateToken);
router.use(checkAdm);
router.post('/getAll', moduleController.getAllUsers);
router.use(validateAdm);
router.post('/goPremium/:id', moduleController.goPremium);
router.post('/removePremium/:id', moduleController.removePremium);

export default router
