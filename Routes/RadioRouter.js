const { createRadio, deleteAllRecord, getRecord } = require("../Controllar/RadioControllar")
const upload = require("../MiddleWare/Multer")

const RadioRouter = require("express").Router()

RadioRouter.post("/radio" , upload.single("file") , createRadio)
RadioRouter.delete("/radiodeletemany" , deleteAllRecord)
RadioRouter.get("/allradio" , getRecord)

module.exports = RadioRouter