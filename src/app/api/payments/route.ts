import { handlePOST } from "@/lib/utils/apiHandler";

import { NextRequest, NextResponse } from "next/server";

function normalizeMessage(data: any, fallback: string) {
  if (!data) return fallback;

  if (Array.isArray(data.message)) {
    // e.g. Nest validation error array
    return data.message
      .map((m: any) => (typeof m === "string" ? m : JSON.stringify(m)))
      .join(" | ");
  }

  if (typeof data.message === "string") return data.message;
  if (typeof data === "string") return data;

  try {
    return JSON.stringify(data);
  } catch {
    return fallback;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read the JSON body from the client (your PaymentDTO)
    const body = await req.json();
    console.log("[/api/payments] incoming body:", body);

    // 2) Forward it to your Nest backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    // 3) Read backend response (text → safely JSON)
    const text = await backendRes.text();
    let data: any;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    // 4) If backend validation fails, forward the error cleanly
    if (!backendRes.ok) {
      const message = normalizeMessage(
        data,
        "Payment request validation failed",
      );

      return NextResponse.json(
        {
          status: "error",
          code: backendRes.status,
          message,
          data,
        },
        { status: backendRes.status },
      );
    }

    // 5) Success – return backend payload as-is
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/payments] proxy error:", err);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message:
          err instanceof Error ? err.message : "Payment proxy request failed",
        data: null,
      },
      { status: 500 },
    );
  }
}
