import express, { Request, Response } from "express";
import ScoreCard from "../models/scoreCardsModals";
import Student from "../models/studentdModals";

const router = express.Router();

// 📌 Add Score Card
router.post("/add", async (req: Request, res: Response):Promise<void> => {
    try {
      const { traineeId, trainerName, trainingTime, workAssigned, workCompleted, workPending, communication, attendance, attitude } = req.body;
  
      // 🔹 Validate if traineeId exists in Student collection
      const student = await Student.findById(traineeId);
      if (!student) {
         res.status(404).json({ error: "Trainee not found" });
         return;
      }
  
      // 🔹 Calculate total score
      const total = communication + attendance + attitude;
  
      // 🔹 Create Score Card
      const scoreCard = new ScoreCard({
        traineeId,
        traineeName: student.fullName,
        trainerName,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        courseName: student.course,
        trainingTime,
        workAssigned,
        workCompleted,
        workPending,
        communication,
        attendance,
        attitude,
        total,
      });
  
      // 🔹 Save Score Card
      await scoreCard.save();
      res.status(201).json({ message: "Score Card added successfully", scoreCard });
      console.log("Score Card added successfully", scoreCard);  
    } catch (error) {
      console.error("Error adding Score Card:", error);
      res.status(500).json({ error: "Failed to add Score Card" });
    }
  });
// 📌 Get All Score Cards
router.get("/all", async (req: Request, res: Response) => {
  try {
    const scoreCards = await ScoreCard.find().populate("traineeId", "fullName course");
    res.status(200).json(scoreCards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Score Cards" });
  }
});

// 📌 Get Score Card by ID
router.get("/:id",async (req: Request, res: Response):Promise<void> => {
  try {
    const scoreCard = await ScoreCard.findById(req.params.id).populate("traineeId", "fullName course");
    if (!scoreCard) {
       res.status(404).json({ error: "Score Card not found" });
      return;
    }
    res.status(200).json(scoreCard);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Score Card" });
  }
});

// 📌 Update Score Card
router.put("/:id", async (req: Request, res: Response):Promise<void> => {
  try {
    const { workAssigned, workCompleted, workPending, communication, attendance, attitude } = req.body;
    const total = communication + attendance + attitude;

    const updatedScoreCard = await ScoreCard.findByIdAndUpdate(
      req.params.id,
      { workAssigned, workCompleted, workPending, communication, attendance, attitude, total },
      { new: true }
    );

    if (!updatedScoreCard) {
       res.status(404).json({ error: "Score Card not found" });
      return;
    }

    res.status(200).json({ message: "Score Card updated successfully", scoreCard: updatedScoreCard });
  } catch (error) {
    res.status(500).json({ error: "Failed to update Score Card" });
  }
});

// 📌 Delete Score Card
router.delete("/:id", async (req: Request, res: Response):Promise<void> => {
  try {
    const deletedScoreCard = await ScoreCard.findByIdAndDelete(req.params.id);
    if (!deletedScoreCard) {
       res.status(404).json({ error: "Score Card not found" });
       return;
    }
    res.status(200).json({ message: "Score Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Score Card" });
  }
});

export default router;
