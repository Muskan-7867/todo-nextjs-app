// src/app/api/auth/verify/route.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const jwtSecret = "mySecret";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token missing' },
        { status: 401 }
      );
    }

    // Decode the token and check verification status
    const decoded = jwt.verify(token, jwtSecret) as { isVerified: boolean; email: string };

    // Respond with authentication status and user details
    return NextResponse.json(
      { isAuthenticated: true, isVerified: decoded.isVerified, email: decoded.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: 'Verification failed', isAuthenticated: false },
      { status: 401 }
    );
  }
}
