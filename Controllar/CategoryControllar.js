const category = require("../Model/CategoryModel")
const { uploadImage, deleteImage } = require("../Utils/Cloudnary")
const fs = require("fs")

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { categoryName } = req.body
        if (!categoryName) {
            return res.status(402).json({
                success: false,
                message: "Cinema Name is must required"
            })
        }
        else {
            if (req.file) {
                const imageurl = await uploadImage(req.file.path)
                const image = imageurl
                fs.unlinkSync(req.file.path)
                const exitname = await category.findOne({ categoryName: categoryName })
                if (exitname) {
                    return res.status(403).json({
                        success: false,
                        message: "this cinema name is already exits"
                    })
                }
                const data = new category({ categoryName, image })
                await data.save()
                res.status(200).json({
                    success: true,
                    message: "New Cinema Addedd successfully!!!!",
                    data: data
                })
            }
            else {
                return res.status(402).json({
                    success: false,
                    message: "Cinema Image is must required"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getcinema = async (req, res) => {
    try {
        const data = await category.find()
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Cinema Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Cinema found successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getSinglecinema = async (req, res) => {
    try {
        const data = await category.findOne({ _id: req.params._id })
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Cinema Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Cinema found successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const updatecinema = async (req, res) => {
    try {
        const data = await category.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Cinema Not Found"
            });
        }

        data.categoryName = req.body.categoryName ?? data.categoryName;

        if (req.file) {
            if (data.image) {
                const oldimage = data.image.split("/").pop().split(".")[0];
                deleteImage(oldimage); 
            }
            const updateimageurl =await uploadImage(req.file.path); 
            data.image = updateimageurl;
            fs.unlinkSync(req.file.path)
        }

        await data.save();
        res.status(200).json({
            success: true,
            message: "Cinema updated successfully",
            data: data
        });
    } catch (error) {
        console.error("Error updating cinema:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const deletecinema = async (req, res) => {
    try {
        const data = await category.findOne({ _id: req.params._id })
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Cinema Not Found"
            })
        }
        else {
            if (data.image) {
                const oldImage = data.image.split("/").pop().split(".")[0]
                deleteImage(oldImage)
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: " Cinema delete successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord, getcinema, getSinglecinema, deletecinema ,updatecinema
}