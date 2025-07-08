import { NextResponse } from "next/server";
import { ResponseDTO } from "@/dto/helper.dto";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  try {
    console.log("📥 Received file upload for profile");
    const formData = await req.formData();

    if (!formData.has("file")) {
      console.error("❌ No 'file' field in formData");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me/images`,
      {
        method: "POST",
        body: formData,
        // ⚠️ Optional: include auth headers if your backend requires it
        headers: {
          Authorization: authHeader || "",
        },
      },
    );

    const data = (await response.json()) as ResponseDTO;
    console.log("📤 Upload result:", data);

    if (data.status !== "success") throw data;

    return NextResponse.json(data);
  } catch (error) {
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
