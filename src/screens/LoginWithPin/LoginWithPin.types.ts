export type FormState = {
  mobile_number: number;
  password: string;
};

export type OtpState = {
  otp: number | null;
};

export interface ILoginRequest {
  password: string | undefined;
  mobile_number: number | undefined;
}
