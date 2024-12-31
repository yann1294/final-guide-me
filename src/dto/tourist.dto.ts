import { FileDTO, Role } from "./helper.dto";

export type TouristDTO = {
    uid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePhoto: string | FileDTO;
    role: Role;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
}





