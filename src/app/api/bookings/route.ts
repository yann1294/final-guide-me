import { NextResponse } from "next/server";
import { BookingDTO } from "@/dto/booking.dto";
import { ResponseDTO } from "@/dto/helper.dto";

// create a new booking
export async function POST(req: Request) {
  try {
    // Parse the incoming request body as JSON
    const bookingData = await req.json();

    // Send a POST request to the backend API to create a new booking
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    // Parse the response data from the backend
    const data = await response.json();

    // Return the parsed data in the Next.js response
    return NextResponse.json(data as ResponseDTO);
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return an error response with status 500
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    } as ResponseDTO, { status: 500 });
  }
}

// get all bookings
export async function GET(req: Request) {
  
  try {
    // Send a GET request to the backend API to get all bookings
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`);

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    // Parse the response data from the backend
    const data = await response.json();

    // Return the parsed data in the Next.js response
    return NextResponse.json(data);
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return an error response with status 500
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    } as ResponseDTO, { status: 500 });
  }
}

