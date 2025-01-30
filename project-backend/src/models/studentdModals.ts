import mongoose, { Schema, Document } from "mongoose";

// Define the attendance schema
const attendanceSchema = new Schema({
  date: { type: String, required: true }, // Store date in "YYYY-MM-DD" format
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

interface IStudent extends Document {
  fullName: string;
  registerNumber: string;
  gender: string;
  admissionDate: Date;
  course: string;
  state: string;
  zipCode: string;
  district: string;
  address: string;
  email: string;
  mobileNumber: string;
  duration: string;
  attendance: { date: string; status: "Present" | "Absent" }[]; // ✅ New Field
}

const studentSchema = new Schema<IStudent>({
  fullName: { type: String, required: true },
  registerNumber: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  admissionDate: { type: Date, required: true },
  course: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  duration: { type: String, required: true },
  attendance: [attendanceSchema], // ✅ Adding attendance records inside Student
});

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
