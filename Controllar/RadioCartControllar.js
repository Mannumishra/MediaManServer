const RadioCartData = require("../Model/RadioCart")

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, state, message, radiocart } = req.body;
        const errorMessage = [];

        if (!name) errorMessage.push("Name is required");
        if (!email) errorMessage.push("Email is required");
        if (!phone) errorMessage.push("Phone is required");
        if (!state) errorMessage.push("State is required");

        if (errorMessage.length > 0) {
            return res.status(400).json({ success: false, message: errorMessage.join(', ') });
        }

        const newRecord = new RadioCartData({
            name,
            email,
            phone,
            state,
            message,
            radiocart
        });

        await newRecord.save();
        res.status(200).json({ success: true, data: newRecord });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getAllRecords = async (req, res) => {
    try {
        const records = await RadioCartData.find();
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const getRecordById = async (req, res) => {
    try {
        // const { id } = req.params;
        const record = await RadioCartData.findOne({_id:req.params._id});

        if (!record) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        clg
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await RadioCartData.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        res.status(200).json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = {
    createRecord ,getAllRecords ,getRecordById ,deleteRecord
}