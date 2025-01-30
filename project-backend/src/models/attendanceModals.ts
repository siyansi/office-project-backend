const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  registerNumber: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Store as "YYYY-MM-DD"
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
