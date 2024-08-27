
const { createRecord, updatecinema, getcinema, getSinglecinema, deletecinema } = require("../Controllar/BlogControllar")
const upload = require("../MiddleWare/Multer")

const BlogRouter = require("express").Router()

BlogRouter.post("/blog", upload.single("image"), createRecord)
BlogRouter.put("/blog/:_id", upload.single("image"), updatecinema)
BlogRouter.get("/blog", getcinema)
BlogRouter.get("/blog/:_id", getSinglecinema)
BlogRouter.delete("/blog/:_id", deletecinema)

module.exports = BlogRouter