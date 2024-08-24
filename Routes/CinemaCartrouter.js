const { createCinemaCart, getAllCinemaCarts, getCinemaCartById } = require("../Controllar/CinemaCartControllar")

const cinemaCartRouter = require("express").Router()

cinemaCartRouter.post("/cinemaCart" , createCinemaCart)
cinemaCartRouter.get("/cinemaCart" , getAllCinemaCarts)
cinemaCartRouter.get("/cinemaCart/:_id" , getCinemaCartById)

module.exports = cinemaCartRouter