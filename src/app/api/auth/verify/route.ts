// src/app/api/auth/verify/route.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const jwtSecret = "mySecret"; // Make sure this matches the secret used to sign the token

export async function POST(request: NextRequest) {
  try {
    // Extract the token from the request body
    const { token } = await request.json();

    // Check if the token exists
    if (!token) {
      return NextResponse.json(
        { error: 'Token missing' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Extract verification status and email from the decoded token
    const { isVerified, email } = decoded as { isVerified: boolean; email: string };

    // Respond with authentication status and user details
    return NextResponse.json(
      { isAuthenticated: true, isVerified, email },
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
