const Hoading = require("../Model/HoadingModel");
const xlsx = require("xlsx");
const media = require("../Model/MediaNameModel");
const fs = require("fs");
const { uploadImage } = require("../Utils/Cloudnary");


const fetchCategoryData = async () => {
    try {
        const data = await media.find();
        const categoryMap = {};
        data.forEach(category => {
            categoryMap[category.medianame] = category.image;
        });
        return categoryMap;
    } catch (error) {
        console.error("Error fetching category data:", error.message);
        throw error;
    }
};

const createManualrecord = async (req, res) => {
    try {
        const { state, city, location, media, width, height, sft, unitType, rpm, flexInstallation, total } = req.body;
        const errorMessage = [];
        if (!state) errorMessage.push("Please select a state.");
        if (!city) errorMessage.push("Please select a city.");
        if (!location) errorMessage.push("Location is required.");
        if (!media) errorMessage.push("Media is required.");
        if (!width) errorMessage.push("Width is required.");
        if (!height) errorMessage.push("Height is required.");
        if (!sft) errorMessage.push("Square Feet (SFT) is required.");
        if (!unitType) errorMessage.push("Unit Type is required.");
        if (!rpm) errorMessage.push("RPM is required.");
        if (!flexInstallation) errorMessage.push("Flex Installation is required.");
        if (!total) errorMessage.push("Total is required.");

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(' ')
            });
        }
        const urlimage = null

        if (req.file) {
            const imageUrl = await uploadImage(req.file.path)
            urlimage = imageUrl
        }
        const newHoading = new Hoading({ state, city, location, media, width, height, sft, unitType, rpm, flexInstallation, total, image: urlimage });
        await newHoading.save()
        res.status(200).json({
            success: true,
            message: "New Hoading Created Successfully",
            data: newHoading
        })
    } catch (error) {
        res.status(500).json({
            success: flase,
            message: "Internal Server Error"
        })
    }
}

const createRecord = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const categoryMap = await fetchCategoryData();

        const uploadAndGetUrl = async (imagePath) => {
            if (fs.existsSync(imagePath)) {
                const url = await uploadImage(imagePath);
                return url;
            }
            return '';
        };

        const cleanRow = async (row) => {
            const cleanedRow = {};
            Object.keys(row).forEach(key => {
                const trimmedKey = key.trim();
                cleanedRow[trimmedKey.toLowerCase()] = typeof row[key] === 'string' ? row[key].trim() : row[key];
            });

            const imagePath = cleanedRow['image'] || ''; // Assuming 'image' column has the local path to the image
            const imageUrl = await uploadAndGetUrl(imagePath);

            return {
                state: cleanedRow['state'] || '',
                city: cleanedRow['city'] || '',
                location: cleanedRow['location'] || '',
                media: cleanedRow['media'] || '',
                width: cleanedRow['w'] ? parseFloat(cleanedRow['w']) : 0,
                height: cleanedRow['h'] ? parseFloat(cleanedRow['h']) : 0,
                sft: cleanedRow['sft'] ? parseFloat(cleanedRow['sft']) : 0,
                unitType: cleanedRow['unit'] || '',
                rpm: cleanedRow['rpm'] ? parseFloat(cleanedRow['rpm']) : 0,
                flexInstallation: cleanedRow['flex/instalation'] || '',
                total: cleanedRow['total'] ? parseFloat(cleanedRow['total']) : 0,
                image: imageUrl || categoryMap[cleanedRow['media']] || ''
            };
        };

        const limitedData = data.slice(0, 10000);
        const cleanedDataPromises = limitedData.map(row => cleanRow(row));
        const cleanedData = await Promise.all(cleanedDataPromises);

        const result = await Hoading.insertMany(cleanedData);
        fs.unlinkSync(filePath);

        res.status(200).json({
            success: true,
            message: `${result.length} records imported successfully`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        const data = await Hoading.find();
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Hoading not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Hoading found successfully",
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
};

const getSingleRecord = async (req, res) => {
    try {
        const data = await Hoading.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Hoading not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Hoading found successfully",
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
};

const deleteRecord = async (req, res) => {
    try {
        const data = await Hoading.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Hoading not found"
            });
        } else {
            if (data.image) {
                const oldImage = data.image.split("/").pop().split(".")[0];
                await deleteImage(oldImage);
            }
            await data.deleteOne();
            res.status(200).json({
                success: true,
                message: "Hoading deleted successfully",
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
};

const updateRecord = async (req, res) => {
    try {
        const data = await Hoading.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Hoading not found"
            });
        } else {
            data.state = req.body.state ?? data.state;
            data.city = req.body.city ?? data.city;
            data.location = req.body.location ?? data.location;
            data.media = req.body.media ?? data.media;
            data.width = req.body.width ?? data.width;
            data.height = req.body.height ?? data.height;
            data.sft = req.body.sft ?? data.sft;
            data.unitType = req.body.unitType ?? data.unitType;
            data.rpm = req.body.rpm ?? data.rpm;
            data.flexInstallation = req.body.flexInstallation ?? data.flexInstallation;
            data.total = req.body.total ?? data.total;
            if (req.file) {
                if (data.image) {
                    const oldImage = data.image.split("/").pop().split(".")[0];
                    await deleteImage(oldImage);
                }
                const newImage = await uploadImage(req.file.path);
                data.image = newImage;
                fs.unlinkSync(req.file.path);
            }
            await data.save();
            res.status(200).json({
                success: true,
                message: "Hoading updated successfully",
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
};

const deleteAllRecord = async (req, res) => {
    try {
        await Hoading.deleteMany()
        res.status(200).json({
            success: true,
            message: "All Record Deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}
module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    deleteRecord,
    updateRecord,
    deleteAllRecord,
    createManualrecord
};
