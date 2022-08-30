import mongoose from "mongoose";

const enrolledClassSchema = new mongoose.Schema({
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'roles'
    },
    class: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classes'
        }],
        required: true
    },
    finalGrade: {
        type: Number
    },
    frequency: {
        type: Number
    }
}, {
    versionKey: false
})

const model = mongoose.model('enrolledClass', enrolledClassSchema);

export default model;