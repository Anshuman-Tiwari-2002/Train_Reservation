const express = require("express");
const { reserveSeats, getSeats } = require("../controllers/seatController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", getSeats);
router.post("/reserve", authenticate, reserveSeats);
module.exports = router;