import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

// Define the TypeScript interface representing a Todo document
export interface ITodo extends Document {
  task: string;
  status: 'inprogress' | 'pending' | 'completed';
  createdAt: Date;
  targetTime: Date;
  user: mongoose.Schema.Types.ObjectId;
}

// Create the Mongoose schema based on the interface
const TodoSchema: MongooseSchema = new MongooseSchema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['inprogress', 'pending', 'completed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    targetTime: {
      type: Date,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
     
    }
  },
  {
    timestamps: true
  }
);

// Create and export the Mongoose model
// const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);


export default Todo;
