export interface ICreateUserDTO {
  email: string;
  name: string;
  auth_key: string | null;
  isGoogleAuth: boolean;
  picture: string;
  isConfirmed?: boolean;
}

export interface IGoogleUserDTO {
  id: string;
  email: string;
  varified_email: boolean;
  name: string;
  picture: string;
}
