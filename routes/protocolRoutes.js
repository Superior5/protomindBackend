import { Router } from "express";
import fileMiddleware from '../middleware/file.js';
import { addMedia, addProtocol, getProtocols,getProtocol , getTranscribe} from "../controllers/protocolController.js";

const router = Router();

router.post('/addMedia', fileMiddleware.single('file'), addMedia);
router.post('/addProtocol', addProtocol);
router.get('/getProtocols', getProtocols);
router.get('/getProtocol', getProtocol);
router.get('/getTranscribe', getTranscribe);

export default router;