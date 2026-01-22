import { Router } from "express";
import upload from "./multer.js";
import {getByBranch, getBySubject, uploadFileController, uploadPdf} from "./pdf.controller.js";
const pdfRouter = Router();
pdfRouter.post('/upload', upload.single('file'), uploadFileController);
pdfRouter.post('/submit', uploadPdf);
pdfRouter.get('/:branch/:year', getByBranch);
pdfRouter.get('/:branch/:year/:subject', getBySubject);
export default pdfRouter