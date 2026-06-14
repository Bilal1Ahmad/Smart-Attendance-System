const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
  try {
    const { rollNumber } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      rollNumber,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      rollNumber,
      date: today,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({
      createdAt: -1,
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAttendancePercentage = async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const totalClasses = 30;

    const attendedClasses = await Attendance.countDocuments({
      rollNumber,
    });

    const percentage =
      (attendedClasses / totalClasses) * 100;

    res.json({
      rollNumber,
      attendedClasses,
      totalClasses,
      percentage: percentage.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getAttendancePercentage,
};