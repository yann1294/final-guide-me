import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  
  try {
    console.log(params.id)
    // Send a GET request to the backend API to get all tours
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${params.id}`);

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch tours");
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

export async function DELETE(req: Request, { params }: any) {
  
  try {
    console.log(params.id)
    // Send a GET request to the backend API to get all tours
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${params.id}`, { method: "DELETE" });

    // If the response from the backend is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to delete tour");
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


export async function PATCH(req: Request) {
  try {
    let body: any = await req.json();
    
    console.log(body)
    // Send a POST request to the backend API to create a tour
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${body['id']}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });

    // Parse the response data from the backend
    const data = await response.json();
    // Return the parsed data in the Next.js response
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    
    // Return an error response with status 500
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: JSON.stringify(error),
      data: null,
    } as ResponseDTO, { status: 500 });
  }
}