import { gql } from "@apollo/client";

export const GET_ALL_ENTRY_QUERY = gql`
  query GetAllEntry {
    getAllEntry {
      title
    }
  }
`;

export const GET_INFO_TMBD_QUERY = gql`
  query GetInfoTmdb($input: GetInfoTmdbInput!) {
    getInfo(input: $input) {
      title
      posterPath
    }
  }
`;
