const mongoose = require("mongoose")

const RadiocategorySchema = new mongoose.Schema({
    radiocategoryName: {
        type: String,
        required: [true, "Category Name is must Required"]
    },
    radioimage: {
        type: String,
        required: [true, "Category Image is must required"]
    }
})


const Radiocategory = mongoose.model("Radiocategory" , RadiocategorySchema)

module.exports = Radiocategory