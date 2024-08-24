const express = require("express")
const cors = require("cors")
const { connectDb } = require("./Database/Database")
const cinemaRouter = require("./Routes/CinemaRouter")
const categoryrouter = require("./Routes/Categoryrouter")
const staterouter = require("./Routes/StateRouter")
const cityrouter = require("./Routes/CityRouter")
const mainCinemaRouter = require("./Routes/MainCinemaRouter")
const HoadingRouter = require("./Routes/HoadingRouter")
const cinemaCartRouter = require("./Routes/CinemaCartrouter")
const mediaRouter = require("./Routes/MediaRouter")
const router = require("./Routes/HoadingCartRouter")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set(express.static("Public"))

app.get("/", (req, res) => {
    res.send("Welcome to Media Man backend!!!!")
})

app.use("/api", cinemaRouter)
app.use("/api", categoryrouter)
app.use("/api", staterouter)
app.use("/api", cityrouter)
app.use("/api", mainCinemaRouter)
app.use("/api", HoadingRouter)
app.use("/api", cinemaCartRouter)
app.use("/api", mediaRouter)
app.use("/api", router)

app.listen(8000, () => {
    console.log("Server Is Running At 8000 Port")
})

connectDb()