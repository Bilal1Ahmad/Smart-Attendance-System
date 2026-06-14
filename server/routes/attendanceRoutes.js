const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getAttendancePercentage,
} = require("../controllers/attendanceController");

router.post("/mark", markAttendance);

router.get("/", getAttendance);

router.get(
  "/percentage/:rollNumber",
  getAttendancePercentage
);

module.exports = router;