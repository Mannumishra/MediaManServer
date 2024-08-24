const express = require("express");
const { createHoadingCart, getAllHoadingCarts, getHoadingCartById, updateHoadingCartById, deleteHoadingCartById } = require("../Controllar/CartHoadingControllar");
const router = express.Router();


router.post("/hoadingcart",createHoadingCart);
router.get("/hoadingcart",getAllHoadingCarts);
router.get("/hoadingcart/:_id", getHoadingCartById);
router.put("/hoadingcart/:_id", updateHoadingCartById);
router.delete("/hoadingcart/:_id", deleteHoadingCartById);

module.exports = router;
