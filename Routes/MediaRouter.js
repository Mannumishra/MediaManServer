const { createRecord, updatemedia, getmedia, getSinglemedia, deletemedia } = require("../Controllar/MediaControllar")
const upload = require("../MiddleWare/Multer")

const mediaRouter = require("express").Router()

mediaRouter.post("/media",upload.single("image") ,createRecord)
mediaRouter.put("/media/:_id",upload.single("image") ,updatemedia)
mediaRouter.get("/media" ,getmedia)
mediaRouter.get("/media/:_id" ,getSinglemedia)
mediaRouter.delete("/media/:_id" ,deletemedia)

module.exports = mediaRouter