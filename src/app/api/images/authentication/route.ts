import { NextResponse } from "next/server";
import { ResponseDTO } from "@/dto/helper.dto";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  try {
    console.log("📥 Received file upload for profile");
    const formData = await req.formData();

    if (!formData.has("profilePhoto") || !formData.has("identificationFile")) {
      throw new Error("Missing required file fields");
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

    if (!response.ok || data.status !== "success") {
      console.error("Upload failed:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy upload error:", error);
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: error instanceof Error ? error.message : "Upload proxy failed",
        data: null,
      } as ResponseDTO,
      { status: 500 },
    );
  }
}
