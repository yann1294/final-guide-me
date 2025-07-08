export interface LocalSignupResponse {
  uid: string;
  emailAddress: string;
  role: { name: string; permissions: string[] };
  authType: "local";
  metadata: { createdAt: string };
  // no tokens on signup
}
