import React, { useState, useEffect } from "react";
import api from "../utils/api";
const BookingPage = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    const fetchSeats = async () => {
      const res = await api.get("/seats");
      setSeats(res.data);
    };
    fetchSeats();
  }, []);
  const reserveSeats = async () => {
    try {
      await api.post("/seats/reserve", { seatNumbers: selectedSeats });
      alert("Seats reserved successfully!");
      setSelectedSeats([]);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div>
      <h1>Reserve Seats</h1>
      <div>
        {seats.map((seat) => (
          <button
            key={seat.seat_number}
            disabled={!!seat.reserved_by}
            onClick={() =>
              setSelectedSeats((prev) =>
                prev.includes(seat.seat_number)
                  ? prev.filter((s) => s !== seat.seat_number)
                  : [...prev, seat.seat_number]
              )
            }
          >
            {seat.seat_number}
          </button>
        ))}
      </div>
      <button onClick={reserveSeats}>Confirm Booking</button>
    </div>
  );
};
export default BookingPage;