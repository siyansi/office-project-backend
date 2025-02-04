import mongoose from "mongoose";

const classRecordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  date: { type: Date, required: true },
  videoUrl: { type: String, required: false }, // Video can be a URL or null
  description: { type: String, required: true },
}, { timestamps: true });

const ClassRecord = mongoose.model("ClassRecord", classRecordSchema);
export default ClassRecord;
