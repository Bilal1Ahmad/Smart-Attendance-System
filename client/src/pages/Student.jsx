import { useState } from "react";
import axios from "axios";

function Student() {
  const [rollNumber, setRollNumber] = useState("");

  const markAttendance = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/mark",
        {
          rollNumber,
        }
      );

      alert("Attendance Marked Successfully!");
      console.log(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Attendance System</h1>

      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) =>
          setRollNumber(e.target.value)
        }
      />

      <button onClick={markAttendance}>
        Mark Attendance
      </button>
    </div>
  );
}

export default Student;