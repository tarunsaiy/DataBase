import { Router } from "express";
import {getActiveUsers, getLogs, post, deleteLogs, postServer, getServer} from "./log.controller.js";
const logRouter = Router();
logRouter.post('/log', post)
logRouter.get('/getLogs', getLogs);
logRouter.get('/totalUsers', getActiveUsers);
logRouter.delete('/delete', deleteLogs);
logRouter.post('/fixServer', postServer);
logRouter.get('/getServer', getServer);
export default logRouter;
