import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nickolas:Apolosol920@cluster0.mgivuxu.mongodb.net/") //URL pega do MongoDB Atlas

let db = mongoose.connection

export default db