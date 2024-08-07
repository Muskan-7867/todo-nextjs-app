import { connect } from "src/utills/db";
import User from "src/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const requestBody = await request.json();
    const { username, email, password, todos } = requestBody;

    // Log the incoming request body for debugging
    console.log("Request Body:", requestBody);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    // Hash the user's password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      todos,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return success response
    return NextResponse.json(
      {
        message: "Account created successfully",
        success: true,
        payload: savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error:", error);

    // Return error response
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
