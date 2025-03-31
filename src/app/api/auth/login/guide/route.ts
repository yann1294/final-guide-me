import { GuideDTO } from "@/dto/guide.dto";
import { ResponseDTO } from "@/dto/helper.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Dummy data for successful login
    const dummyGuide: GuideDTO = {
      "uid": "TgupNT9l75vO9n2a6s69",
      "firstName": "Alice",
      "lastName": "Smith",
      "phoneNumber": "+9876543210",
      "emailAddress": "alicesmith@example.com",
      "profilePhoto": "https://firebasestorage.googleapis.com/v0/b/gmback-206ae.appspot.com/o/profile_photos%2FTgupNT9l75vO9n2a6s69?alt=media&token=606224ab-d38c-45eb-b5d9-320f15dbfe80",
      "role": {
        "name": "guide"
      },
      "accountStatus": "inactive",
      "createdAt": "2023-11-15T14:30:00Z",
      "updatedAt": "2023-11-15T14:30:00Z",
      "identification": {
        "file": "https://firebasestorage.googleapis.com/v0/b/gmback-206ae.appspot.com/o/identification_photos%2FTgupNT9l75vO9n2a6s69?alt=media&token=b4463e43-617a-4c56-acea-1f239a491bc8"
      },
      "spokenLanguages": [
        "English",
        "French",
        "German"
      ],
      "availability": true
    } as unknown as GuideDTO

    const response: ResponseDTO = {
      status: 'success',
      code: 200,
      message: 'Successfully fetched document.',
      data: dummyGuide,
    };

    // Delay for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json(response);

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 'error',
      code: 500,
      message: error,
      data: null,
    }, { status: 500 });
  }
}
