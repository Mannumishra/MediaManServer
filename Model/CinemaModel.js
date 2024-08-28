const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
    cinemaChain: {
        type: String,
        // required: [true, "Cinema Chain is required"]
    },
    region: {
        type: String,
        // required: [true, "Region is required"]
    },
    state: {
        type: String,
        // required: [true, "State is required"]
    },
    city: {
        type: String,
        // required: [true, "City is required"]
    },
    category: {
        type: String,
        // required: [true, "Cinema Category is required"]
    },
    cinema: {
        type: String,
        // required: [true, "Cinema Name is required"]
    },
    audi: {
        type: mongoose.Schema.Types.Mixed,
        // required: [true, "Audi is required"]
    },
    seatingCapacity: {
        type: Number,
        // required: [true, "Seating Capacity is required"]
    },
    baseRate10SecWeek: {
        type: Number,
        // required: [true, "Base Rate/10 Sec/Week is required"]
    },
    baseRateBB10SecWeek: {
        type: Number,
        // required: [true, "Base Rate BB/10 Sec/Week is required"]
    },
    baseRateMBB10SecWeek: {
        type: Number,
        // required: [true, "Base Rate MBB/10 Sec/Week is required"]
    },
    image:{
        type:String
    }
}, { timestamps: true });

const Cinema = mongoose.model("Cinema", cinemaSchema);

module.exports = Cinema;
