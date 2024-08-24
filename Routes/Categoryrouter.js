const { createquality, getCategory, getSingleCategory, deleteCategory, updateCategory } = require("../Controllar/SittingControllar")

const categoryrouter = require("express").Router()

categoryrouter.post("/category" , createquality)
categoryrouter.get("/category" , getCategory)
categoryrouter.get("/category/:_id" , getSingleCategory)
categoryrouter.delete("/category/:_id" , deleteCategory)
categoryrouter.put("/category/:_id" , updateCategory)

module.exports = categoryrouter