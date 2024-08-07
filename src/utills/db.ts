// lib/mongodb.ts
import mongoose from 'mongoose';

// const mongoUrl: string = process.env.mongodb_url!;
const mongoUrl: string = "mongodb://localhost:27017/todo-app"

if (!mongoUrl) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

export async function connect(): Promise<void> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
}
