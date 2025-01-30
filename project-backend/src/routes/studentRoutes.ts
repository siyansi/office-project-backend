import express, { Request, Response } from "express";
import Student from "../models/studentdModals";
import authenticateToken from "../controller/authenticateToken";
import roleMiddleware from "../Middleware/roleMiddleware";

const router = express.Router();

// 📌 Add Student (Only Admins)
router.post("/add", async (req: Request, res: Response) => {
  try {
    console.log("rrrrrrr",req.body)

    const student = new Student(req.body);
    console.log("ddddd",student);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// 📌 Get All Students (Only Authenticated Users)
router.get("/all", async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
});

// 📌 Get Student by ID
router.get("/:id",  async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student){
        res.status(404).json({ error: "Student not found" });return;
    }  
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Error fetching student" });
  }
});

// 📌 Update Student (Only Admins)
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedStudent) {
        res.status(404).json({ error: "Student not found" });return ;
      } 
      res.json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      res.status(500).json({ error: "Failed to update student" });
    }
  });

// 📌 Delete Student (Only Admins)
router.delete("/:id",   async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
        res.status(404).json({ error: "Student not found" });return;
    }  
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});


router.post("/attendance/mark", async (req: Request, res: Response):Promise<void> => {
    const { registerNumber, date, status } = req.body;
  
    if (!registerNumber || !date || !status) {
       res.status(400).json({ message: "Missing required fields" });return;
    }
  
    try {
      // ✅ Find student by register number
      const student = await Student.findOne({ registerNumber });
  
      if (!student) {
         res.status(404).json({ message: "Student not found" });
            return;
      }
  
      // ✅ Check if attendance for the same date already exists
      const existingAttendance = student.attendance.find((entry) => entry.date === date);
  
      if (existingAttendance) {
        existingAttendance.status = status; // ✅ Update status
      } else {
        student.attendance.push({ date, status }); // ✅ Add new attendance entry
      }
  
      await student.save();
      res.status(200).json({ message: "Attendance recorded successfully", student });
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // 📌 Get Attendance by Date
  router.get("/attendance", async (req: Request, res: Response):Promise<void> => {
    const { date } = req.query;
  
    if (!date) {
       res.status(400).json({ message: "Date is required" });return;
    }
  
    try {
      // ✅ Get all students with attendance for a specific date
      const students = await Student.find({ "attendance.date": date });
  
      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
