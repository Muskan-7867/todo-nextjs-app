
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';


export interface ITodo extends Document {
  task: string;
  status: 'inprogress' | 'pending' | 'completed';
  createdAt: Date;
<<<<<<< HEAD
=======
  targetTime?: Date; // Marking targetTime as optional in the interface
>>>>>>> master
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
<<<<<<< HEAD
=======
    },
    targetTime: {
      type: Date,
      required: false, // Ensure this field is optional
>>>>>>> master
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
<<<<<<< HEAD
    }
    
  },
=======
    },
  }
>>>>>>> master
);

// Use existing model if available or create a new one
const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
