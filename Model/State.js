const mongoose = require("mongoose")

const stateschema = new mongoose.Schema({
    state:{
        type:String,
        required:[true,"State is must required"]
    }
})

const State = mongoose.model("state" , stateschema)

module.exports = State