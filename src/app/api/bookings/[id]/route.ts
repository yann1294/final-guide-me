// pages/api/bookings/[id].ts

import { ResponseDTO } from '@/dto/helper.dto';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    

    // Send a GET request to the backend API to fetch the booking by ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${params.id}`);

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch booking data");
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
    }, { status: 500 });
  }
}


// update booking by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Parse the request body as JSON
    const bookingData = await req.json();

    // Send a PUT request to the backend API to update the booking by ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to update booking");
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



