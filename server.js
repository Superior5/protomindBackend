import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import connect from "./db/db.js";

import protocolRouter from './routes/protocolRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));
app.use('/uploads/audios', express.static(path.join(__dirname, 'uploads/audios')));


app.use('/api', protocolRouter);

app.listen(process.env.PORT || 5100, () => {
    console.log('server work');
});