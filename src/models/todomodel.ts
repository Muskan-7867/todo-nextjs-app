import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

// Define the TypeScript interface representing a Todo document
export interface ITodo extends Document {
  task: string;
  status: 'inprogress' | 'pending' | 'completed';
  createdAt: Date;
  targetTime?: Date; // Marking targetTime as optional in the interface
  user: mongoose.Schema.Types.ObjectId;
}

// Create the Mongoose schema based on the interface
const TodoSchema: MongooseSchema = new MongooseSchema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['inprogress', 'pending', 'completed'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    targetTime: {
      type: Date,
      required: false, // Ensure this field is optional
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }
);

const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
