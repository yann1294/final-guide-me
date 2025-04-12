import { ResponseDTO } from "@/dto/helper.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Sign in the user
    const { email, password } = await req.json();

    // Sign in to server
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/tourist/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await response.json();

    return NextResponse.json(data);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    }, { status: 500 });
  }
}
