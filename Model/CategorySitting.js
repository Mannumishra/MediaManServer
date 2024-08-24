const mongoose = require("mongoose")

const sittingcategoryschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is must required"]
    }
})

const sittingcategory = mongoose.model("sittingcategory" , sittingcategoryschema)

module.exports = sittingcategory