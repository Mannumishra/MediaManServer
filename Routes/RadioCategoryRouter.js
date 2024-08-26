const { createRecord, updatecinema, getcinema, getSinglecinema, deletecinema } = require("../Controllar/RadioCategoryControllar")
const upload = require("../MiddleWare/Multer")

const RadioCategoryRouter = require("express").Router()

RadioCategoryRouter.post("/radioCategory",upload.single("radioimage"), createRecord)
RadioCategoryRouter.put("/radioCategory:/_id",upload.single("radioimage"), updatecinema)
RadioCategoryRouter.get("/radioCategory" ,getcinema)
RadioCategoryRouter.get("/radioCategory/:_id",getSinglecinema)
RadioCategoryRouter.delete("/radioCategory/:_id",deletecinema)

module.exports = RadioCategoryRouter