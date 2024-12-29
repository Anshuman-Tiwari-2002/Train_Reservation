const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            username,
            hashedPassword,
        ]);
        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(400).send("Error registering user");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE username = $1", [
            username,
        ]);

        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                user.rows[0].password
            );

            if (validPassword) {
                const token = jwt.sign(
                    { userId: user.rows[0].id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.json({ token });
            } else {
                res.status(401).send("Invalid credentials");
            }
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
