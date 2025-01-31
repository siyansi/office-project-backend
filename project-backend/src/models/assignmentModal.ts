import mongoose, { Schema, Document } from "mongoose";

interface IAssignment extends Document {
  name: string;
  deadline: Date;
  topic: string;
  attachment?: string;
}

const AssignmentSchema = new Schema<IAssignment>({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  topic: { type: String, required: true },
  attachment: { type: String },
});

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
