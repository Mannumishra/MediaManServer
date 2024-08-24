const mongoose = require("mongoose")

const connectDb = async()=>{
    try {
        await mongoose.connect("mongodb+srv://mannu22072000:6ljOcjFGZuNEtjZr@cluster0.w09gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database is connected successfully!!!!!!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectDb
}