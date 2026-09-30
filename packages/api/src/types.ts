export type VerificationLevel = 'unverified' | 'verified';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  verification_level: VerificationLevel;
  is_verified: boolean;
  date_joined: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface ConfirmPasswordResetInput {
  uid: string;
  token: string;
  new_password: string;
}

export interface DetailResponse {
  detail: string;
}
