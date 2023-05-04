import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Users = new Schema({
    email: String,
    name: String,
    password: String,
});

const model = mongoose.model("users", Users);

export default model;
