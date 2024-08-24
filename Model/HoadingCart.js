const mongoose = require("mongoose")

const cartitem = new mongoose.Schema({
    media: {
        type: String,
        required: [true, "Name is must required"]
    },
    state: {
        type: String,
        required: [true, "Size is must required"]
    },
    city: {
        type: String,
        required: [true, "Size is must required"]
    },
    location: {
        type: String,
        required: [true, "Image is must required"]
    },
    width: {
        type: Number,
        required: [true, "Name is must required"]
    },
    height: {
        type: Number,
        required: [true, "Size is must required"]
    },
    rpm: {
        type: Number,
        required: [true, "Size is must required"]
    },
    amount: {
        type: Number,
        required: [true, "Image is must required"]
    },
    image: {
        type: String,
        required: [true, "Image is must required"]
    }
},{ timestamps: true })
const hoadingSchema = new mongoose.Schema({
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
    hoadingcart: {
        type: [cartitem],
        required: [true, "Item is must required"]
    }
}, { timestamps: true })

const HoadingCart = mongoose.model("hoadingCart", hoadingSchema)

module.exports = HoadingCart