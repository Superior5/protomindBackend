import { Schema } from "mongoose";
import mongoose from "mongoose";

const roleSchema = Schema({
    value: {type: String, unique: true, required: true, default: 'SECRETARY'},
});

const Role = mongoose.model('Role', roleSchema);

export default Role;