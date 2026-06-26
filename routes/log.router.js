import { Router } from "express";
import {getActiveUsers, getLogs, post, deleteLogs, postServer, getServer, postLevel, getLevel, getUsersByYear, getUsersByBranch} from "../controllers/log.controller.js";
const logRouter = Router();
logRouter.post('/log', post)
logRouter.get('/getLogs', getLogs);
logRouter.get('/totalUsers', getActiveUsers);
logRouter.get('/getByYear/:year', getUsersByYear);
logRouter.get('/getByBranch/:branch', getUsersByBranch);
logRouter.delete('/delete', deleteLogs);
logRouter.post('/fixServer', postServer);
logRouter.get('/getServer', getServer);
logRouter.post('/postLevel', postLevel)
logRouter.post('/getLevel', getLevel)

export default logRouter;
