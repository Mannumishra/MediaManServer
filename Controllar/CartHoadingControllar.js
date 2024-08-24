const HoadingCart = require("../Model/HoadingCart");

// Create a new hoading cart item
exports.createHoadingCart = async (req, res) => {
    try {
        console.log("i am hit ")
      console.log(req.body); // Debug log
      const { name, email, phone, message,state, hoadingcart } = req.body;
      const newHoadingCart = new HoadingCart({
        name,
        email,
        phone,
        message,
        state,
        hoadingcart, // Correct field name here
      });
  
      const savedHoadingCart = await newHoadingCart.save();
      res.status(201).json({
        success: true,
        data: savedHoadingCart,
      });
    } catch (error) {
      console.error("Error creating hoading cart:", error); // Detailed error log
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };
  

// Get all hoading cart items
exports.getAllHoadingCarts = async (req, res) => {
    try {
        const hoadingCarts = await HoadingCart.find();
        res.status(200).json({
            success: true,
            data: hoadingCarts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Get a single hoading cart item by ID
exports.getHoadingCartById = async (req, res) => {
    try {
        const hoadingCart = await HoadingCart.findOne({_id:req.params._id});
        if (!hoadingCart) {
            return res.status(404).json({
                success: false,
                error: "Hoading cart not found",
            });
        }

        res.status(200).json({
            success: true,
            data: hoadingCart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Update a hoading cart item by ID
exports.updateHoadingCartById = async (req, res) => {
    try {
        const { name, email, phone, message, item } = req.body;
        const updatedHoadingCart = await HoadingCart.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, message, item },
            { new: true, runValidators: true }
        );

        if (!updatedHoadingCart) {
            return res.status(404).json({
                success: false,
                error: "Hoading cart not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedHoadingCart,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Delete a hoading cart item by ID
exports.deleteHoadingCartById = async (req, res) => {
    try {
        const hoadingCart = await HoadingCart.findByIdAndDelete(req.params.id);

        if (!hoadingCart) {
            return res.status(404).json({
                success: false,
                error: "Hoading cart not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {},
            message: "Hoading cart deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
