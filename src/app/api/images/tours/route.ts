import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let formData: FormData = await req.formData();
    
    console.log(formData)
    // Send a POST request to the backend API to create a tour
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/images`, {
      method: "POST",
      body: formData
    });

    // Parse the response data from the backend
    const data = await response.json() as ResponseDTO;
    console.log("Data: ", data)
    // check whether the response status is 'success'
    if (data.status !== 'success') {
      throw data;
    }
    
    // Return the parsed data in the Next.js response
    console.log("File upload:", data)
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