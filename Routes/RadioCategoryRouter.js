const {createRecord,getRadio,getSingleRadio ,deleteRadio,updateRadio} = require("../Controllar/RadioCategoryControllar")
const upload = require("../MiddleWare/Multer")

const RadioCategoryRouter = require("express").Router()

RadioCategoryRouter.post("/radioCategory",upload.single("radioimage"), createRecord)
RadioCategoryRouter.put("/radioCategory:/_id",upload.single("radioimage"),updateRadio)
RadioCategoryRouter.get("/radioCategory" ,getRadio)
RadioCategoryRouter.get("/radioCategory/:_id",getSingleRadio)
RadioCategoryRouter.delete("/radioCategory/:_id",deleteRadio)

module.exports = RadioCategoryRouter