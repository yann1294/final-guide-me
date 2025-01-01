import { ResponseDTO } from "@/dto/helper.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Dummy data for successful login
    const dummyTourist: TouristDTO = {
      uid: 'QCqiRmZZrncdQaav5dHU',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      emailAddress: 'johndoe@example.com',
      profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/gmback-206ae.appspot.com/o/profile_photos%2FQCqiRmZZrncdQaav5dHU?alt=media&token=f83fef0d-893f-40c9-8978-fcb962898601',
      role: { name: 'tourist' },
      accountStatus: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      identification: {
        type: 'passport',
        file: 'https://firebasestorage.googleapis.com/v0/b/gmback-206ae.appspot.com/o/identification_photos%2FQCqiRmZZrncdQaav5dHU?alt=media&token=d9312d01-0f16-4c8d-b9c5-3102dfd82387'
      },
      spokenLanguages: ['English', 'Spanish']
    } as TouristDTO;

    const response: ResponseDTO = {
      status: 'success',
      code: 200,
      message: 'Successfully fetched document.',
      data: dummyTourist,
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
