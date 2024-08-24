const mongoose = require("mongoose")

const city = new mongoose.Schema({
    state:{
        type:String,
        required:[true,"State is must required"]
    },
    city:{
        type:String,
        required:[true,"State is must required"]
    }
})

const City = mongoose.model("City" , city)

module.exports = City