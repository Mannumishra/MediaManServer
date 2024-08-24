const { importData, getRecord, deleteAllRecord, deleteRecord, getSingleRecord, createManualRecord, updateCinema, getTotalRecord, searchRecords } = require("../Controllar/CinemaControllar")
// const { createCinema, getRecord, getSingleRecord, deleteRecord, updateRecord, importData } = require("../Controllar/CinemaControllar")
const upload = require("../MiddleWare/Multer")

const mainCinemaRouter = require("express").Router()

mainCinemaRouter.post("/cinemaimport", upload.single("file"), importData)
mainCinemaRouter.post("/manual-create", createManualRecord)
mainCinemaRouter.get("/cinemaimport", getRecord)
mainCinemaRouter.get("/cinemaimport/:_id",  getSingleRecord)
mainCinemaRouter.put("/updatecinema/:_id", upload.single("image"), updateCinema)
mainCinemaRouter.post("/deleteallcinema", deleteAllRecord)
mainCinemaRouter.delete("/deleterecord/:_id", deleteRecord)
mainCinemaRouter.get("/allcinemarecord", getTotalRecord)
mainCinemaRouter.get("/search", searchRecords)

module.exports = mainCinemaRouter