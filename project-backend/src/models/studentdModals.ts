import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

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
  password: string;
  role: "Student" | "Trainer" | "Admin"; // ✅ Role Field Added
  attendance: { date: string; status: "Present" | "Absent" }[];
}

// Define student schema
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
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Trainer", "Admin"], default: "Student" }, // ✅ Default role is Student
  attendance: [attendanceSchema],
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
