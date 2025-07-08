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

export async function handlePOST(url: string, req: Request) {
  try {
    // Send a POST request to the backend API to create a tour
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(await req.json()),
    });

    // Parse the response data from the backend
    const data = await response.json();

    // Return the parsed data in the Next.js response
    return NextResponse.json(data);
  } catch (error) {
    // Return an error response with status 500
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: JSON.stringify(error),
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
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

// handle patch requests
export async function handlePATCH(url: string, req: Request) {
  try {
    // 1) Read the raw request body exactly once
    const bodyText = await req.text();

    // 2) (Optional) log the parsed JSON or raw text for debugging
    try {
      console.log("🔗 Proxy body:", JSON.parse(bodyText));
    } catch {
      console.log("🔗 Proxy body (raw):", bodyText);
    }

    // 3) Reconstruct headers for the downstream request
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    // const auth = req.headers.get("authorization");
    // if (auth) {
    //   headers["authorization"] = auth;
    // }

    // 4) Proxy the PATCH to the real backend
    const proxyRes = await fetch(url, {
      method: "PATCH",
      headers,
      body: bodyText,
    });

    // 5) Read and return the backend’s JSON response
    const data = await proxyRes.json();
    return NextResponse.json(data, { status: proxyRes.status });
  } catch (err: any) {
    console.error("❌ handlePATCH error:", err);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: err.message,
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
  }
}

export async function handlePATCHProfile(targetUrl: string, req: Request) {
  try {
    // 1) Read the raw body exactly once
    const bodyText = await req.text();

    // 2) (Optional) log the parsed JSON for debugging
    let parsed: any;
    try {
      parsed = JSON.parse(bodyText);
      console.log("🔗 Proxy body:", parsed);
    } catch {
      console.log("🔗 Proxy body (raw):", bodyText);
    }

    // 3) Build headers with Authorization
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const auth = req.headers.get("Authorization");
    if (auth) headers["Authorization"] = auth;

    // 4) Actually proxy to your backend
    const proxyRes = await fetch(targetUrl, {
      method: "PATCH",
      headers,
      body: bodyText,
    });

    const data = await proxyRes.json();
    return NextResponse.json(data, { status: proxyRes.status });
  } catch (err: any) {
    console.error("❌ handlePATCHProfile error:", err);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: err.message,
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
  }
}
