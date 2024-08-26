const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
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
});

const radioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    radiocart: {
        type: [cartItemSchema],
        required: [true, "Cart items are required"]
    }
}, { timestamps: true });

const RadioCartData = mongoose.model("RadioCartData", radioSchema);

module.exports = RadioCartData;
