const Cinema = require("../Model/CinemaModel");
const Category = require("../Model/CategoryModel");
const xlsx = require("xlsx");
const fs = require("fs");
const { uploadImage } = require("../Utils/Cloudnary");

const fetchCategoryData = async () => {
    try {
        const data = await Category.find();
        const categoryMap = {};
        data.forEach(category => {
            categoryMap[category.categoryName] = category.image;
        });
        return categoryMap;
    } catch (error) {
        console.error("Error fetching category data:", error.message);
        throw error;
    }
};

const categoryData = async (req, res) => {
    try {
        const data = await Category.find();
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Data Found",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Endpoint to import data from Excel
const importData = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const categoryMap = await fetchCategoryData();

        // Function to clean and transform row data
        const cleanRow = (row) => ({
            cinemaChain: (row['CINEMA CHAIN'] || '').trim(),
            region: (row['REGION'] || '').trim(),
            state: (row['STATE'] || '').trim(),
            city: (row['CITY'] || '').trim(),
            category: (row['CINEMA CATEGORY'] || '').trim(),
            cinema: (row['CINEMA'] || '').trim(),
            audi: typeof row['AUDI'] === 'string' ? row['AUDI'].trim() : '',
            seatingCapacity: row[' SEATING CAPACITY '] ? parseInt(row[' SEATING CAPACITY '].toString().trim()) : null,
            baseRate10SecWeek: row[' BASE RATE/10 SEC/WEEK '] ? parseInt(row[' BASE RATE/10 SEC/WEEK '].toString().trim()) : null,
            baseRateBB10SecWeek: row[' BASE RATE BB /10 SEC/WEEK '] ? parseInt(row[' BASE RATE BB /10 SEC/WEEK '].toString().trim()) : null,
            baseRateMBB10SecWeek: row[' BASE RATE MBB/10 SEC/WEEK '] ? parseInt(row[' BASE RATE MBB/10 SEC/WEEK '].toString().trim()) : null,
            image: categoryMap[row['CINEMA CHAIN']] || ''
        });

        const limitedData = data.slice(0, 10000);

        // Process and save each row
        const savePromises = limitedData.map(async (row) => {
            try {
                const cinema = new Cinema(cleanRow(row));

                if (!cinema.seatingCapacity || !cinema.baseRate10SecWeek || !cinema.baseRateBB10SecWeek || !cinema.baseRateMBB10SecWeek) {
                    console.error(`Missing required fields for cinema ${cinema.cinema}`);
                    return { success: false, cinema: cinema.cinema, error: 'Required fields are missing' };
                }

                await cinema.save();
                return { success: true, cinema: cinema.cinema };
            } catch (error) {
                console.error(`Error saving cinema ${row['CINEMA']}:`, error);
                return { success: false, cinema: row['CINEMA'], error: error.message };
            }
        });

        const results = await Promise.all(savePromises);
        fs.unlinkSync(filePath);

        const failedResults = results.filter(result => !result.success);
        if (failedResults.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Some records could not be saved",
                failedRecords: failedResults,
            });
        }

        res.status(200).json({
            success: true,
            message: "Data imported successfully",
        });

    } catch (error) {
        console.error('Error processing Excel file:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Endpoint to get records with pagination
const getRecord = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const data = await Cinema.find().skip(skip).limit(limit);
        const totalRecords = await Cinema.countDocuments();

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Records Found",
                data: data,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit)
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

const getTotalRecord = async (req, res) => {
    try {
        const data = await Cinema.find();

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Records Found",
                data: data,
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
        await Cinema.deleteMany()
        res.status(200).json({
            success: true,
            message: "All Record Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const deleteRecord = async (req, res) => {
    try {
        const data = await Cinema.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data Not found"
            })
        }
        await data.deleteOne()
        res.status(200).json({
            success: true,
            message: "Record Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getSingleRecord = async (req, res) => {
    try {
        const data = await Cinema.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data Not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Record Found Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const createManualRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { cinemaChain, region, state, city, category, cinema, audi, seatingCapacity, baseRate10SecWeek, baseRateBB10SecWeek, baseRateMBB10SecWeek } = req.body
        const errorMessage = []
        if (!state) errorMessage.push("State is required.");
        if (!city) errorMessage.push("City is required.");
        if (!category) errorMessage.push("Category is required.");
        if (!cinema) errorMessage.push("Cinema is required.");
        if (!audi) errorMessage.push("Audi is required.");
        if (!seatingCapacity) errorMessage.push("Seating Capacity is required.");
        if (!baseRate10SecWeek) errorMessage.push("Base Rate for 10 seconds (Week) is required.");
        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        const newRecord = new Cinema({ cinemaChain, region, state, city, category, cinema, audi, seatingCapacity, baseRate10SecWeek, baseRateBB10SecWeek, baseRateMBB10SecWeek, image })
        await newRecord.save()
        res.status(200).json({
            success: true,
            message: "Record created successfully.",
            data: newRecord
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateCinema = async (req, res) => {
    try {
        const data = await Cinema.findOne({ _id: req.params._id })
        console.log(data)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        else {
            console.log(req.body)
            data.cinemaChain = req.body.cinemaChain ?? data.cinemaChain
            data.region = req.body.region ?? data.region
            data.state = req.body.state ?? data.state
            data.city = req.body.city ?? data.city
            data.category = req.body.category ?? data.category
            data.cinema = req.body.cinema ?? data.cinema
            data.audi = req.body.audi ?? data.audi
            data.seatingCapacity = req.body.seatingCapacity ?? data.seatingCapacity
            data.baseRate10SecWeek = req.body.baseRate10SecWeek ?? data.baseRate10SecWeek
            data.baseRateBB10SecWeek = req.body.baseRateBB10SecWeek ?? data.baseRateBB10SecWeek
            data.baseRateMBB10SecWeek = req.body.baseRateMBB10SecWeek ?? data.baseRateMBB10SecWeek
            if (req.file) {
                const uploadimageurl = await uploadImage(req.file.path)
                data.image = uploadimageurl
            }
            await data.save()
            res.status(200).json({
                success: true,
                message: "Cinema Updated Successfully",
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

const searchRecords = async (req, res) => {
    try {
        const { cinemaChain, state, city, category } = req.query;
        const query = {};

        if (cinemaChain) query.cinemaChain = cinemaChain;
        if (state) query.state = state;
        if (city) query.city = city;
        if (category) query.category = category;

        const data = await Cinema.find(query);

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No records found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Records found",
            data: data
        });
    } catch (error) {
        console.error('Error searching records:', error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    importData,
    getRecord,
    categoryData,
    deleteAllRecord, deleteRecord, getSingleRecord, createManualRecord, updateCinema ,getTotalRecord ,searchRecords
};
