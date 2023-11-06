import { Schema } from "mongoose";
import mongoose from "mongoose";

const protocolSchema = Schema({
    topic: {type: String, default: 'Не указан'},
    subject: {type: String, default: 'Не указан'},
    secretary: {type: String, required: true},
    director: {type: String, default: 'Не указан'},
    date: {type: String, default: new Date()},
    video: {type: String, default: null},
    audio: {type: String, required: true},
    transcribe: {type: String, required: true, default: "В процессе"},
});

const Protocol = mongoose.model('Protocol', protocolSchema);

export default Protocol;