const { createRecord, updateRecord, deleteRecord, getSingleRecord, getRecord, deleteAllRecord, createManualrecord } = require("../Controllar/HoadingControllar")
const upload = require("../MiddleWare/Multer")

const HoadingRouter = require("express").Router()

HoadingRouter.post("/hoading" ,upload.single("file") , createRecord)
HoadingRouter.get("/hoading"  , getRecord)
HoadingRouter.get("/hoading/:_id"  , getSingleRecord)
HoadingRouter.delete("/hoading/:_id"  , deleteRecord)
HoadingRouter.put("/hoading/:_id" ,upload.single("image") , updateRecord)
HoadingRouter.post("/deleteallhoading" , deleteAllRecord)
HoadingRouter.post("/manualhoading" ,upload.single("image") , createManualrecord)

module.exports = HoadingRouter