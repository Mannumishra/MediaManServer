const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category Name is must Required"]
    },
    image: {
        type: String,
        required: [true, "Category Image is must required"]
    }
})


const category = mongoose.model("category" , categorySchema)

module.exports = category