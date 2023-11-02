import mongoose from "mongoose";
const mongoURL = "mongodb://localhost:27017/protomind";


export default async function connect() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURL).then(() => {
        console.log("database work");
    }).catch((err) => {
        console.log(err);
    });
};