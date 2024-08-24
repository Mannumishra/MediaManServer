const mongoose = require("mongoose")


const cartdata = new mongoose.Schema({
    cinemaName: {
        type: String,
        required: [true, "Cinema Name is must Required"]
    },
    name: {
        type: String,
        // required:[true, "Name is must Required"]
    },
    category: {
        type: String,
        required: [true, "Category is must required"]
    },
    state: {
        type: String,
        required: [true, "State is must required"]
    },
    city: {
        type: String,
        required: [true, "city is must required"]
    },
    screen: {
        type: String,
        required: [true, "screen is must required"]
    },
    seating: {
        type: Number,
        required: [true, "seating is must required"]
    },
    money: {
        type: Number,
        required: [true, "money is must required"]
    },
    image: {
        type: String,
        required: [true, "Image is must required"]
    }
},{ timestamps: true })

const CinemaCartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must require"]
    },
    email: {
        type: String,
        required: [true, "email is must require"]
    },
    phone: {
        type: String,
        required: [true, "phone is must require"]
    },
    state: {
        type: String,
        required: [true, "phone is must require"]
    },
    message: {
        type: String,
        required: [true, "message is must require"]
    },
    item: {
        type: [cartdata],
        required: [true, "item is must required"]
    }
}, { timestamps: true })

const cinemaCart = mongoose.model("cinemacart", CinemaCartSchema)

module.exports = cinemaCart