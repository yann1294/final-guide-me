import { FileDTO, Role } from "./helper.dto";

export type AdminDTO = {
    uid?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePhoto?: string | FileDTO;
    role: Role;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
}