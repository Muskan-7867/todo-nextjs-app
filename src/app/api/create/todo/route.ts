

import { NextRequest, NextResponse } from "next/server";
import Todo from "src/models/todomodel";
import { connect } from "src/utills/db";


connect()

export async function POST(request: NextRequest, ) {

  console.log("inside  api");
  
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { task, status,  targetTime} = reqBody;
    console.log("inside  try", task);

    // Basic validation
    if (!task || !status || !targetTime ) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Create a new Todo instance
    const newTodo = new Todo({
      task,
      status,
     // Ensure the field name matches your model
      // createdAt: new Date(createdAt), // it will auomatically filled   by function Date.now  on model file
      targetTime: new Date(targetTime), // Convert to Date if needed
    });

    // Save the Todo to the database
    const savedTodo = await newTodo.save();

    // Return a success response
    return NextResponse.json(
      {
        message: "Todo created successfully",
        success: true,
        payload: savedTodo,
      },
      { status: 200 }
    
    );
  } catch (error) {
    // Return an error response
    console.error("Error creating Todo:", error);
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}