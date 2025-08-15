// app/api/admin/guides/approval/[uid]/route.ts
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { uid: string } },
) {
  try {
    const bodyText = await req.text(); // read once
    const body = bodyText ? JSON.parse(bodyText) : {};
    const status = body?.approvalStatus;

    const backendUrl =
      status === "approved"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/approve/${params.uid}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/reject/${params.uid}`;

    const headers = new Headers(req.headers);
    headers.set("content-type", "application/json"); // ensure JSON
    // If you use bearer auth from client, it will be forwarded automatically by cloning headers

    const resp = await fetch(backendUrl, {
      method: "PATCH",
      headers,
      body: bodyText, // forward the same body
    });

    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err: any) {
    console.error("Admin approval proxy error:", err);
    return NextResponse.json(
      {
        status: "failure",
        code: 500,
        message: err?.message ?? "Proxy error",
        data: null,
      },
      { status: 500 },
    );
  }
}
