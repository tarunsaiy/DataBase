import { Router } from "express";
import upload from "../middleware/multer.js";
import {deletePdf, getByBranch, getBySearch, getBySubject, updatePdf, uploadFileController, uploadPdf} from "../controllers/pdf.controller.js";
const pdfRouter = Router();
pdfRouter.post('/upload', upload.single('file'), uploadFileController);
pdfRouter.post('/submit', uploadPdf);
pdfRouter.get('/:branch/:year', getByBranch);
pdfRouter.get('/:branch/:year/:subject', getBySubject);
pdfRouter.get('/', getBySearch);
pdfRouter.delete('/delete', deletePdf);
pdfRouter.put('/update', updatePdf);
export default pdfRouter