import { FileDTO, Identification, Role } from "./helper.dto";

export type TouristDTO = {
    uid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePhoto: string | FileDTO;
    role: Role;
    accountStatus: string;
    createdAt: {
        _seconds: number;
        _nanoseconds: number;
    };
    updatedAt: {
        _seconds: number;
        _nanoseconds: number;
    };
    identification: Identification;
    spokenLanguages: string[];
}