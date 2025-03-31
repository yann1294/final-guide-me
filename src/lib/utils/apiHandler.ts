import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function handleGET(url: string) {
    try {
        // Send a GET request to the backend API to get all tours
        const response = await fetch(url);

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

export async function handlePOST(url: string, req: Request) {
    try {
        // Send a POST request to the backend API to create a tour
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(await req.json())
        });

        // Parse the response data from the backend
        const data = await response.json();

        // Return the parsed data in the Next.js response
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

// handle delete requests
export async function handleDELETE(url: string) {
    try {
        // Send a GET request to the backend API to get all tours
        const response = await fetch(url, { method: "DELETE" });

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

// handle patch requests
export async function handlePATCH(url: string, req: Request, body: string | null = null) {
    try {
        // Send a POST request to the backend API to create a tour
        const response = await fetch(url, {
            method: "PATCH",
            body: body != null ? body : JSON.stringify(await req.json())
        });

        // Parse the response data from the backend
        const data = await response.json();
        // Return the parsed data in the Next.js response
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        // Return an error response with status 500
        return NextResponse.json({
            status: 'error',
            code: 500,
            message: JSON.stringify(error),
            data: null,
        } as ResponseDTO, { status: 500 });
    }
}