const City = require("../Model/City")

const createcity = async (req, res) => {
    try {
        console.log(req.body);
        const { state ,city } = req.body;

        if (!state || !city) {
            return res.status(402).json({
                success: false,
                message: "State is required"
            });
        }
        const exitstate = await City.findOne({ state: state , city:city });
        if (exitstate) {
            return res.status(403).json({
                success: false,
                message: "This state and city already exists"
            });
        } else {
            // Creating a new state document
            const data = new City({ state ,city });
            await data.save();
            res.status(200).json({
                success: true,
                message: "State city created successfully",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



const getcity = async (req, res) => {
    try {
        const data = await City.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "City Not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "City found",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getSinglecity = async (req, res) => {
    try {
        const data = await City.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "state Not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "state found",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deletecity = async (req, res) => {
    try {
        const data = await City.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "state Not found"
            })
        }
        else {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: "state Delete Successfully",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const updatecity = async (req, res) => {
    try {
        const data = await City.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "state Not found"
            })
        }
        else {
            data.state = req.body.state ?? data.state
            data.city = req.body.city ?? data.city
            await data.save()
            res.status(200).json({
                success: true,
                message: "City Updated Successfully",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
module.exports = {
    createcity, getcity, getSinglecity, deletecity ,updatecity
}