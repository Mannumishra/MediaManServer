const { createRecord, getcinema, getSinglecinema, deletecinema, updatecinema } = require("../Controllar/CategoryControllar")
const upload = require("../MiddleWare/Multer")

const cinemaRouter = require("express").Router()

cinemaRouter.post("/create-cinema", upload.single("image"), createRecord)
cinemaRouter.put("/create-cinema/:_id", upload.single("image"), updatecinema)
cinemaRouter.get("/create-cinema", getcinema)
cinemaRouter.get("/create-cinema/:_id", getSinglecinema)
cinemaRouter.delete("/create-cinema/:_id", deletecinema)

module.exports = cinemaRouter