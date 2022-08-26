import mongoose from "mongoose";
import EnrolledClass from "./EnrolledClass.js"

const userSchema = new mongoose.Schema({
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    register: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "enrolledClass"
        }]
    }
})

const model = mongoose.model('users', userSchema);

export default model;
