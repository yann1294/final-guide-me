// // app/api/admin/guides/approval/[uid]/route.ts
// import { NextResponse } from "next/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { uid: string } },
// ) {
//   try {
//     const bodyText = await req.text(); // read once
//     const body = bodyText ? JSON.parse(bodyText) : {};
//     const status = body?.approvalStatus;

//     const backendUrl =
//       status === "approved"
//         ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/approve/${params.uid}`
//         : `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/guides/reject/${params.uid}`;

//     const headers = new Headers(req.headers);
//     headers.set("content-type", "application/json"); // ensure JSON
//     // If you use bearer auth from client, it will be forwarded automatically by cloning headers

//     const resp = await fetch(backendUrl, {
//       method: "PATCH",
//       headers,
//       body: bodyText, // forward the same body
//     });

//     const data = await resp.json().catch(() => ({}));
//     return NextResponse.json(data, { status: resp.status });
//   } catch (err: any) {
//     console.error("Admin approval proxy error:", err);
//     return NextResponse.json(
//       {
//         status: "failure",
//         code: 500,
//         message: err?.message ?? "Proxy error",
//         data: null,
//       },
//       { status: 500 },
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";
// export const runtime = "nodejs"; // uncomment if you need Node runtime

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const payload = await req.json();
  const authorization = req.headers.get("authorization") ?? "";
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const res = await fetch(`${BACKEND_URL}/admin/guides/approve/${id}`, {
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
