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
}

export interface PartialUser {
  uid: string;
  emailAddress: string;
  role: {
    name: string;
    permissions: string[];
  };
}
