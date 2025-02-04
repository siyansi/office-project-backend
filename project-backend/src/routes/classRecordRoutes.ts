import express, { Request, Response } from "express";
import ClassRecord from "../models/classRecordModal";

const router = express.Router();

/** ➤ Create a new class record */
router.post("/add", async (req: Request, res: Response): Promise <void> => {
  try {
    const { title, subtitle, date, videoUrl, description } = req.body;

    if (!title || !date || !description) {
       res.status(400).json({ error: "Title, Date, and Description are required." });
       return;
    }

    const newClassRecord = new ClassRecord({
      title,
      subtitle,
      date,
      videoUrl,
      description,
    });

    await newClassRecord.save();
    res.status(201).json(newClassRecord);
  } catch (error) {
    res.status(500).json({ error: "Failed to create class record." });
  }
});

/** ➤ Get all class records */
router.get("/see", async (_req: Request, res: Response) => {
  try {
    const records = await ClassRecord.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class records." });
  }
});

/** ➤ Get a single class record by ID */
router.get("/:id",async (req: Request, res: Response): Promise <void> => {
  try {
    const record = await ClassRecord.findById(req.params.id);
    if (!record) {
       res.status(404).json({ error: "Class record not found." });
      return;
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class record." });
  }
});

/** ➤ Update a class record */
router.put("/update/:id", async (req: Request, res: Response): Promise <void> =>  {
  try {
    const { title, subtitle, date, videoUrl, description } = req.body;

    const updatedRecord = await ClassRecord.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, date, videoUrl, description },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
       res.status(404).json({ error: "Class record not found." });
      return;
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: "Failed to update class record." });
  }
});

/** ➤ Delete a class record */
router.delete("/delete/:id", async (req: Request, res: Response): Promise <void> =>  {
  try {
    const deletedRecord = await ClassRecord.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
       res.status(404).json({ error: "Class record not found." });
       return;
    }

    res.status(200).json({ message: "Class record deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete class record." });
  }
});

export default router;
