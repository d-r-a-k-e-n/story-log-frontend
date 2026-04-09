export interface ILoginInput {
  input: {
    email: string;
    password: string;
  };
}

export interface ILoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
  };
}
