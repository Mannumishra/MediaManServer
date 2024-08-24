const cinemaCart = require('../Model/CinemaCart');

exports.createCinemaCart = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, message, item ,state } = req.body;
        const newCinemaCart = new cinemaCart({
            name,
            email,
            phone,
            message,
            item,
            state,
        });
        const savedCinemaCart = await newCinemaCart.save();
        res.status(200).json({
            success: true,
            message: 'CinemaCart created successfully',
            data: savedCinemaCart
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to create CinemaCart',
            error: error.message
        });
    }
};


exports.getAllCinemaCarts = async (req, res) => {
    try {
        const cinemaCarts = await cinemaCart.find();
        res.status(200).json({
            success: true,
            data: cinemaCarts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch CinemaCarts',
            error: error.message
        });
    }
};


exports.getCinemaCartById = async (req, res) => {
    try {
        const data = await cinemaCart.findOne({_id:req.params._id});
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'CinemaCart not found'
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch CinemaCart',
            error: error.message
        });
    }
};

// // Update a CinemaCart entry by ID
// exports.updateCinemaCart = async (req, res) => {
//     try {
//         const { name, email, phone, message, item } = req.body;

//         const updatedCinemaCart = await CinemaCart.findByIdAndUpdate(
//             req.params.id,
//             { name, email, phone, message, item },
//             { new: true, runValidators: true }
//         );

//         if (!updatedCinemaCart) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'CinemaCart not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'CinemaCart updated successfully',
//             data: updatedCinemaCart
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to update CinemaCart',
//             error: error.message
//         });
//     }
// };

// // Delete a CinemaCart entry by ID
// exports.deleteCinemaCart = async (req, res) => {
//     try {
//         const cinemaCart = await CinemaCart.findByIdAndDelete(req.params.id);

//         if (!cinemaCart) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'CinemaCart not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'CinemaCart deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to delete CinemaCart',
//             error: error.message
//         });
//     }
// };
