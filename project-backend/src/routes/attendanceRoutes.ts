import express, { Request, Response } from 'express';
import Attendance from '../models/attendanceModals';


const router = express.Router();

// 📌 Get attendance for today for a specific student (Only Authenticated Users)
router.get('/:studentId', async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

    const attendance = await Attendance.findOne({
      studentId,
      attendanceDate: { $gte: startOfDay, $lte: endOfDay }
    }).populate('studentId'); // Populate student details

    if (!attendance) {
       res.status(404).json({ message: 'Attendance record not found' });return;
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance', error });
  }
});

// 📌 Submit attendance for a specific student (Only Admins)
router.post('/:studentId',  async (req: Request, res: Response): Promise<void> =>  {
  const { studentId } = req.params;
  const { status, attendanceDate } = req.body;

  try {
    // Check if attendance for the student already exists for the given date
    const existingAttendance = await Attendance.findOne({
      studentId,
      attendanceDate: new Date(attendanceDate),
    });

    if (existingAttendance) {
     res.status(400).json({ message: 'Attendance for this date already exists' });  return;
    }

    // Create new attendance record
    const attendance = new Attendance({
      studentId,
      status,
      attendanceDate: new Date(attendanceDate),
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance submitted successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit attendance', error });
  }
});

// 📌 Update attendance for a specific student and date (Only Admins)
router.put('/:studentId', async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;
  const { status, attendanceDate } = req.body;

  try {
    // Find the attendance record
    const attendance = await Attendance.findOne({
      studentId,
      attendanceDate: new Date(attendanceDate),
    });

    if (!attendance) {
       res.status(404).json({ message: 'Attendance record not found' });return;
    }

    // Update the status
    attendance.status = status;
    await attendance.save();

    res.status(200).json({ message: 'Attendance updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update attendance', error });
  }
});

export default router;
