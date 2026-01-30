import { Router } from "express";
import upload from "./multer.js";
import {deletePdf, getByBranch, getBySearch, getBySubject, uploadFileController, uploadPdf} from "./pdf.controller.js";
const pdfRouter = Router();
pdfRouter.post('/upload', upload.single('file'), uploadFileController);
pdfRouter.post('/submit', uploadPdf);
pdfRouter.get('/:branch/:year', getByBranch);
pdfRouter.get('/:branch/:year/:subject', getBySubject);
pdfRouter.get('/', getBySearch);
pdfRouter.delete('/delete', deletePdf);
export default pdfRouter