import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation ($input: RegisterUserInput!) {
    register(input: $input) {
      email
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
