const { createcity, getcity, getSinglecity, deletecity, updatecity } = require("../Controllar/CityControllar")

const cityrouter = require("express").Router()

cityrouter.post("/city" , createcity)
cityrouter.get("/city" , getcity)
cityrouter.get("/city/:_id" , getSinglecity)
cityrouter.delete("/city/:_id" , deletecity)
cityrouter.put("/city/:_id" , updatecity)

module.exports = cityrouter