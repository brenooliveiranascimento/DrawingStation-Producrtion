import bodyParser from "body-parser";
import { Router, raw } from "express";
import WebHooksController from "../services/Subscriptions/WebHooksController";
const router = Router();

const webHooksController = new WebHooksController();

router.post('/', raw({type: 'application/json'}), (request, response) => webHooksController
  .handle(request, response));

export default router;
