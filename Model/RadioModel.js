const mongoose = require("mongoose")

const RadioSchema = new mongoose.Schema({
    station: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }
}, { timestamps: true })

const Radio = mongoose.model("Radio" , RadioSchema)

module.exports = Radio