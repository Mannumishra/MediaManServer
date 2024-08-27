const Radiocategory = require("../Model/RadioCategoryModel")
const { uploadImage, deleteImage } = require("../Utils/Cloudnary")
const fs = require("fs")

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { radiocategoryName } = req.body
        if (!radiocategoryName) {
            return res.status(402).json({
                success: false,
                message: "Radio Name is must required"
            })
        }
        else {
            if (req.file) {
                const imageurl = await uploadImage(req.file.path)
                const radioimage = imageurl
                fs.unlinkSync(req.file.path)
                const exitname = await Radiocategory.findOne({ radiocategoryName: radiocategoryName })
                if (exitname) {
                    return res.status(403).json({
                        success: false,
                        message: "this Radio name is already exits"
                    })
                }
                const data = new Radiocategory({ radiocategoryName, radioimage })
                await data.save()
                res.status(200).json({
                    success: true,
                    message: "New Radio Addedd successfully!!!!",
                    data: data
                })
            }
            else {
                return res.status(402).json({
                    success: false,
                    message: "Radio Image is must required"
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

const getRadio = async (req, res) => {
    try {
        const data = await Radiocategory.find()
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Radio Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Radio found successfully",
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

const getSingleRadio = async (req, res) => {
    try {
        const data = await Radiocategory.findOne({ _id: req.params._id })
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Radio Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Radio found successfully",
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


const updateRadio = async (req, res) => {
    try {
        const data = await Radiocategory.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Radio Not Found"
            });
        }

        data.radiocategoryName = req.body.radiocategoryName ?? data.radiocategoryName;

        if (req.file) {
            if (data.radioimage) {
                const oldimage = data.radioimage.split("/").pop().split(".")[0];
                deleteImage(oldimage); 
            }
            const updateimageurl =await uploadImage(req.file.path); 
            data.radioimage = updateimageurl;
            fs.unlinkSync(req.file.path)
        }

        await data.save();
        res.status(200).json({
            success: true,
            message: "Radio updated successfully",
            data: data
        });
    } catch (error) {
        console.error("Error updating Radio:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const deleteRadio = async (req, res) => {
    try {
        const data = await Radiocategory.findOne({ _id: req.params._id })
        if (!data) {
           return res.status(404).json({
                success: false,
                message: "Radio Not Found"
            })
        }
        else {
            if (data.radioimage) {
                const oldImage = data.radioimage.split("/").pop().split(".")[0]
                deleteImage(oldImage)
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: " Radio delete successfully",
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
    createRecord, getRadio, getSingleRadio, deleteRadio ,updateRadio
}