//const mongoose = require("mongoose")
import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: "India" }
    },
    image: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            url: { type: String, required: true }
        }
    ]
},{
    versionKey: false
})

const projectModel = mongoose.model("project", projectSchema)

export default projectModel;
//module.exports = projectModel;
