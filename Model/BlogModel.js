const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: [true, "blog Name is must Required"]
    },
    image: {
        type: String,
        required: [true, "blog Image is must required"]
    },
    blogDescription: {
        type: String,
        required: [true, "blog Image is must required"]
    }
}, { timestamps: true })


const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog