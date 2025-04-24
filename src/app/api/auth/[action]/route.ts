import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL; // e.g. "http://localhost:3001"

export async function POST(
  req: Request,
  { params }: { params: { action: "signin" | "signup" } },
) {
  const { action } = params;

  // ✅ Debug Logs
  console.log("[API] /api/auth/" + action + " hit");

  // 1. Read incoming JSON
  const body = await req.json();

  // 2. Validate action
  if (action !== "signin" && action !== "signup") {
    return NextResponse.json(
      { status: "error", code: 404, message: "Not found", data: null },
      { status: 404 },
    );
  }

  // 3. Build target URL
  const url = `${BACKEND}/auth/local/${action}`;
  console.log("[API] Forwarding to backend URL:", url);

  // 4. Proxy to your real backend
  let backendRes: Response;
  try {
    backendRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // signup expects { emailAddress, password, role? }
      // signin expects { emailAddress, password }
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    console.error("Proxy error:", e);
    return NextResponse.json(
      { status: "error", code: 500, message: e.message, data: null },
      { status: 500 },
    );
  }

  // 5. Parse backend response (may be JSON or text)
  let data: any;
  try {
    data = await backendRes.json();
  } catch {
    data = await backendRes.text();
  }

  // 6. Forward success or error back to client
  if (!backendRes.ok) {
    return NextResponse.json(
      {
        status: "error",
        code: backendRes.status,
        message: data?.message ?? "Authentication failed",
        data: null,
      },
      { status: backendRes.status },
    );
  }

  // 7. On success, return exactly what your backend sent
  return NextResponse.json(data, { status: 200 });
}
