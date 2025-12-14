import { NextResponse } from "next/server";
import { BookingDTO } from "@/dto/booking.dto";
import { ResponseDTO } from "@/dto/helper.dto";

function normalizeMessage(data: any, fallback: string) {
  if (!data) return fallback;

  // Nest default error format
  if (Array.isArray(data.message)) {
    // class-validator errors array OR strings array
    return data.message
      .map((m: any) => (typeof m === "string" ? m : JSON.stringify(m)))
      .join(" | ");
  }

  if (typeof data.message === "string") return data.message;

  // generic
  if (typeof data === "string") return data;

  try {
    return JSON.stringify(data);
  } catch {
    return fallback;
  }
}

// create a new booking
export async function POST(req: Request) {
  try {
    // Parse the incoming request body as JSON
    const bookingData = await req.json();

    // Send a POST request to the backend API to create a new booking
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      },
    );

    // Parse the response data from the backend
    // const data = await response.json();

    // // If the response from the backend is not OK, throw an error
    // if (!response.ok) {
    //   return NextResponse.json(data, { status: response.status });
    // }
    const text = await response.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    // ✅ Forward backend error as-is
    if (!response.ok) {
      const message = normalizeMessage(data, "Booking validation failed");

      return NextResponse.json(
        {
          status: "error",
          code: response.status,
          message,
          data,
        } as ResponseDTO,
        { status: response.status },
      );
    }

    // Return the parsed data in the Next.js response
    return NextResponse.json(data as ResponseDTO);
  } catch (error) {
    // Log the error to the console
    console.error(error);

    // Return an error response with status 500
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: error,
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
  }
}

// get all bookings
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`,
      { cache: "no-store" },
    );

    const text = await response.text();
    let data: any;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          code: response.status,
          message: normalizeMessage(data, "Failed to fetch bookings"),
          data,
        } as ResponseDTO,
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: error instanceof Error ? error.message : "Server error",
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
  }
}
