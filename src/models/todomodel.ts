
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';


export interface ITodo extends Document {
  task: string;
  status: 'inprogress' | 'pending' | 'completed';
  createdAt: Date;
  user: mongoose.Schema.Types.ObjectId;
}


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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
    
  },
);

// Use existing model if available or create a new one
const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
