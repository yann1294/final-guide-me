import { NextResponse } from "next/server";
import { ResponseDTO } from "@/dto/helper.dto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/images/identification`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = (await response.json()) as ResponseDTO;

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
