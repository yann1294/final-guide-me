// dto/auth.dto.ts

export interface LocalSigninResponse {
  uid: string;
  emailAddress: string;
  role: {
    name: string;
    permissions: string[];
  };
  authType: "local";
  metadata: {
    createdAt: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  identificationFile?: string;
  identificationType?: string;
  spokenLanguages?: string[];
  availability?: boolean;
}

export interface LocalSigninAPIResponse {
  status: string;
  message: string;
  data: LocalSigninResponse;
}

export interface PartialUser {
  uid: string;
  emailAddress: string;
  role: {
    name: string;
    permissions: string[];
  };
  // Add optional profile-related fields
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  spokenLanguages?: string[];
  identification?: {
    file?: string;
    type?: string;
  };
  availability?: boolean;
}
