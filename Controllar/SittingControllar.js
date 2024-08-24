const sittingcategory = require("../Model/CategorySitting")

const createquality = async (req, res) => {
    try {
        console.log(req.body)
        const { name } = req.body
        if (!name) {
            return res.status(402).json({
                success: false,
                message: "SItting Quality name is must required"
            })
        }
        else {
            const exitname = await sittingcategory.findOne({ name: name })
            if (exitname) {
                return res.status(403).json({
                    success: false,
                    message: "This name is already exit"
                })
            }
            else {
                const data = new sittingcategory({ name })
                await data.save()
                res.status(200).json({
                    success: true,
                    message: "Sitting quality created successfully",
                    data: data
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getCategory = async (req, res) => {
    try {
        const data = await sittingcategory.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category Not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Category found",
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

const getSingleCategory = async (req, res) => {
    try {
        const data = await sittingcategory.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category Not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Category found",
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

const deleteCategory = async (req, res) => {
    try {
        const data = await sittingcategory.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category Not found"
            })
        }
        else {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: "Category Delete Successfully",
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


const updateCategory = async (req, res) => {
    try {
        const data = await sittingcategory.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category Not found"
            })
        }
        else {
            data.name = req.body.name ?? data.name
            await data.save()
            res.status(200).json({
                success: true,
                message: "Category Updated Successfully",
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
    createquality, getCategory, getSingleCategory, deleteCategory ,updateCategory
}