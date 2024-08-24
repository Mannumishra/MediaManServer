const { getstate, getSinglestate, deletestate, updatestate, createstate } = require("../Controllar/StateControllar")

const staterouter = require("express").Router()

staterouter.post("/state" , createstate)
staterouter.get("/state" , getstate)
staterouter.get("/state/:_id" , getSinglestate)
staterouter.delete("/state/:_id" , deletestate)
staterouter.put("/state/:_id" , updatestate)

module.exports = staterouter