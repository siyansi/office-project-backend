import mongoose, { Schema, Document } from "mongoose";

interface IAssignment extends Document {
  name: string;
  deadline: Date;
  topic: string;
  attachment?: string;
  assignee:string
}

const AssignmentSchema = new Schema<IAssignment>({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  topic: { type: String, required: true },
    assignee: { type: String, required: false },
  attachment: { type: String },
});

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
