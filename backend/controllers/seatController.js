const db = require("../config/db");
const getSeats = async (req, res) => {
  const seats = await db.query("SELECT * FROM seats ORDER BY seat_number ASC");
  res.status(200).json(seats.rows);
};
const reserveSeats = async (req, res) => {
  const { seatNumbers } = req.body;
  const { username } = req.user;
  try {
    await db.query("BEGIN");
    for (const seatNumber of seatNumbers) {
      const result = await db.query(
        "UPDATE seats SET reserved_by = $1 WHERE seat_number = $2 AND reserved_by IS NULL RETURNING *",
        [username, seatNumber]
      );
      if (result.rows.length === 0) throw new Error(`Seat ${seatNumber} is already reserved`);
    }
    await db.query("COMMIT");
    res.status(200).json({ message: "Seats reserved successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getSeats, reserveSeats };