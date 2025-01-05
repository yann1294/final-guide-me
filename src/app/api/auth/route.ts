import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { username, password } = await req.json();
  
      // Send a POST request to the backend API to authenticate the user
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      // If the response from the backend is not OK, throw an error
      if (!response.ok) {
        throw new Error("Failed to login");
      }
  
      // Parse the response data from the backend
      const data = await response.json();
  
      // return the parsed data in the Next.js response
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
  