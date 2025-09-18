import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_BASE_URL ?? "http://localhost:3001";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const payload = await req.json();
  const authorization = req.headers.get("authorization") ?? "";
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const res = await fetch(`${BACKEND_URL}/guides/reject/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authorization && { Authorization: authorization }),
        ...(cookie && { Cookie: cookie }),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    console.log(
      "[proxy approve] auth present:",
      Boolean(authorization),
      "cookie present:",
      Boolean(cookie),
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 },
    );
  }
}
