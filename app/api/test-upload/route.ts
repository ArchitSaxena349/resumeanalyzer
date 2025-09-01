import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    
    return NextResponse.json({
      success: true,
      user: user ? {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName
      } : null,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      uploadthingConfigured: !!(process.env.UPLOADTHING_SECRET && process.env.UPLOADTHING_TOKEN && process.env.UPLOADTHING_APP_ID)
    });
  } catch (error) {
    console.error('Test upload API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}