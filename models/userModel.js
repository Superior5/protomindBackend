import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = Schema({
    name: {type: String},
    username: {type: String, unique: true, required: true},
    login:  {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, ref: 'Role', default: 'SECRETARY'},
});

const User = mongoose.model('User', userSchema);

export default User;