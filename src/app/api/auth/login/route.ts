import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from 'src/models/usermodel';
import { connect } from 'src/utills/db';
import { NextRequest, NextResponse } from 'next/server';

connect();
const jwtSecret =  "mySecret"; 
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, password: user.password },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      { token, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
