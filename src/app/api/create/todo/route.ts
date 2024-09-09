import { NextRequest, NextResponse } from "next/server";
import Todo from "src/models/todomodel";
import { connect } from "src/utills/db";

// Establish a database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { task, targetTime = null, status = 'pending' } = reqBody; 

    // Basic validation
    if (!task) {
      return NextResponse.json(
        { error: 'Missing required fields', success: false },
        { status: 400 }
      );
    }

    // Create a new Todo instance
    const newTodo = new Todo({
      task,
      status,
      targetTime, // This will be null if not provided
    });

    // Save the Todo to the database
    const savedTodo = await newTodo.save();

    // Return a success response
    return NextResponse.json(
      {
        message: 'Todo created successfully',
        success: true,
        payload: savedTodo,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Return an error response
    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        success: false,
      },
      { status: 500 }
    );
  }
}

