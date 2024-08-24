const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({
    medianame: {
        type: String,
        required: [true, "media Name is must Required"]
    },
    image: {
        type: String,
        required: [true, "media Image is must required"]
    }
})


const media = mongoose.model("media" , mediaSchema)

module.exports = media