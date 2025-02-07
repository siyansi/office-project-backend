import mongoose, { Schema, Document } from "mongoose";

// Define the interface for Score Card
interface IScoreCard extends Document {
  traineeId: mongoose.Schema.Types.ObjectId;
  traineeName: string;
  trainerName: string;
  date: string;
  courseName: string;
  trainingTime: string;
  workAssigned: string;
  workCompleted: string;
  workPending: string;
  communication: number;
  attendance: number;
  attitude: number;
  total: number;
}

// Define the schema for Score Card
const ScoreCardSchema = new Schema<IScoreCard>({
  traineeId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  traineeName: { type: String, required: true },
  trainerName: { type: String, required: true },
  date: { type: String, required: true },
  courseName: { type: String, required: true },
  trainingTime: { type: String, required: true },
  workAssigned: { type: String, required: true },
  workCompleted: { type: String, required: true },
  workPending: { type: String, required: true },
  communication: { type: Number, required: true, min: 0, max: 5 },
  attendance: { type: Number, required: true, min: 0, max: 5 },
  attitude: { type: Number, required: true, min: 0, max: 5 },
  total: { type: Number, required: true },
});

const ScoreCard = mongoose.model<IScoreCard>("ScoreCard", ScoreCardSchema);
export default ScoreCard;
