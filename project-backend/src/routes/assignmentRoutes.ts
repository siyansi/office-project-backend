import express, { Request, Response } from "express";
import Assignment from "../models/assignmentModal";
import multer from "multer";
import path from "path";
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // specify the folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // add timestamp to avoid name conflicts
    },
  });
  
  const upload = multer({ storage: storage });

// ➤ Create a new assignment
router.post("/add", upload.single("attachment"), async (req, res) => {
    try {
      const { name, deadline, topic } = req.body;
      const attachment = req.file ? req.file.path : null; // Store the file path if uploaded
      const newAssignment = new Assignment({ name, deadline, topic, attachment });
      await newAssignment.save();
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

// ➤ Get all assignments
router.get("/see", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// ➤ Get a single assignment by ID
router.get("/:id", async (req: Request, res: Response):Promise<void> =>{
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
       res.status(404).json({ error: "Assignment not found" });
       return;
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
});

// ➤ Update an assignment
router.put("/:id", async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update assignment" });
  }
});

// ➤ Delete an assignment
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
});

export default router;
