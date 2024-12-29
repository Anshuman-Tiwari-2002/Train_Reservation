require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
