const cloudnary = require("cloudinary").v2

cloudnary.config({
    cloud_name: "dsimn9z1r",
    api_key: "998919427255124",
    api_secret: "h-PsVovtSvzakWubj1X8sXJEtp4"
})

const uploadImage = async (file) => {
    try {
        const imageurl = await cloudnary.uploader.upload(file)
        return imageurl.secure_url
    } catch (error) {
        console.log("Error Iamge upload")
    }
}

const deleteImage = async (file) => {
    try {
        await cloudnary.uploader.destroy(file)
        console.log("Image is deleted successfully")
    } catch (error) {
        console.log("Error to image delete")
    }
}

module.exports = {
    uploadImage, deleteImage
}