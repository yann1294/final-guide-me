import { FileDTO, Identification, Role } from './helper.dto'

export type GuideDTO = {
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
    identification: Identification;
    spokenLanguages: string[];
    availability: boolean;
}