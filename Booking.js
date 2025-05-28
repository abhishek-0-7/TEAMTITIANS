const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  address: String,
  time: String,
  service: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", BookingSchema);