const Radio = require("../Model/RadioModel");
const xlsx = require("xlsx");
const fs = require("fs");
const Radiocategory = require("../Model/RadioCategoryModel");
const { uploadImage } = require("../Utils/Cloudnary");


const fetchCategoryData = async () => {
    try {
        const data = await Radiocategory.find();
        const categoryMap = {};
        data.forEach(category => {
            categoryMap[category.radiocategoryName] = category.radioimage;
        });
        return categoryMap;
    } catch (error) {
        console.error("Error fetching category data:", error.message);
        throw error;
    }
};

const createRadio = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const categoryMap = await fetchCategoryData();

        const uploadAndGetUrl = async (imagePath) => {
            if (imagePath && fs.existsSync(imagePath)) {
                try {
                    const url = await uploadImage(imagePath);
                    console.log("Uploaded Image URL:", url);
                    return url;
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError.message);
                    return '';
                }
            } else {
                console.log("Invalid or non-existent image path:", imagePath);
                return '';
            }
        };

        const radios = await Promise.all(data.map(async item => {
            const imagePath = item['image'] ? item['image'].trim() : '';
            const imageUrl = await uploadAndGetUrl(imagePath);

            const finalImageUrl = imageUrl || categoryMap[item['Stations']] || '';
            console.log("Final Image URL:", finalImageUrl);

            return {
                station: item['Stations'] ? item['Stations'].toString().trim() : '',
                state: item['State '] ? item['State '].toString().trim() : '',
                city: item['City'] ? item['City'].toString().trim() : '',
                rate: item['Rate/10 sec'] ? item['Rate/10 sec'].toString().trim() : '',
                image: finalImageUrl
            };
        }));

        // Filter out existing records and insert new ones
        const existingRecords = await Radio.find({
            $or: radios.map(radio => ({
                station: radio.station,
                state: radio.state,
                city: radio.city,
                rate: radio.rate
            }))
        });

        const existingRecordSet = new Set(existingRecords.map(record => JSON.stringify(record)));
        const newRecords = radios.filter(radio => !existingRecordSet.has(JSON.stringify(radio)));

        if (newRecords.length > 0) {
            await Radio.insertMany(newRecords);
        }

        res.status(200).json({
            success: true,
            message: "Data inserted successfully",
            data: newRecords
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    } finally {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
    }
};



const deleteAllRecord = async (req, res) => {
    try {
        const data = await Radio.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record not Found"
            })
        }
        await Radio.deleteMany()
        res.status(200).json({
            success: true,
            message: "Radio Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        const data = await Radio.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Record Found successfully",
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
    createRadio, deleteAllRecord, getRecord
};
