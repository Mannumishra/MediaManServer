const State = require("../Model/State")

const createstate = async (req, res) => {
    try {
        console.log(req.body);
        const { state } = req.body;

        if (!state) {
            return res.status(402).json({
                success: false,
                message: "State is required"
            });
        }
        const exitstate = await State.findOne({ state: state });
        if (exitstate) {
            return res.status(403).json({
                success: false,
                message: "This state already exists"
            });
        } else {
            // Creating a new state document
            const data = new State({ state });
            await data.save();

            res.status(200).json({
                success: true,
                message: "State created successfully",
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



const getstate = async (req, res) => {
    try {
        const data = await State.find()
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

const getSinglestate = async (req, res) => {
    try {
        const data = await State.findOne({ _id: req.params._id })
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

const deletestate = async (req, res) => {
    try {
        const data = await State.findOne({ _id: req.params._id })
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


const updatestate = async (req, res) => {
    try {
        const data = await State.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "state Not found"
            })
        }
        else {
            data.state = req.body.state ?? data.state
            await data.save()
            res.status(200).json({
                success: true,
                message: "state Updated Successfully",
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
    createstate, getstate, getSinglestate, deletestate ,updatestate
}