import mongoose from "mongoose";
const mongoURL = "mongodb+srv://madasaev:oAKiTR6EmhzhV1WA@cluster0.8czp0rb.mongodb.net/"

export default async function connect() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURL).then(() => {
        console.log("database work");
    }).catch((err) => {
        console.log(err);
    });
};