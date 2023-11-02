import { Router } from "express";
import fileMiddleware from '../middleware/file.js';
import { addMedia } from "../controllers/protocolController.js";

const router = Router();

router.post('/addMedia', fileMiddleware.single('file'), addMedia);

export default router;