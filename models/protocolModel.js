import { Schema } from "mongoose";
import mongoose from "mongoose";

const protocolSchema = Schema({
    topic: {type: String, required: true},
    subject: {type: String, required: true},
    secretary: 
    
});

const Protocol = mongoose.model('Protocol', protocolSchema);

export default Protocol;