import { gql } from "@apollo/client";

export const GET_ALL_ENTRY_QUERY = gql`
  query GetAllEntry {
    getAllEntry {
      title
    }
  }
`;

export const GET_INFO_FROM_TMDB_QUERY = gql`
  query GetInfoFromTmdb($input: GetInfoFromTmdbInput!) {
    getInfoFromTmdb(input: $input) {
      title
      posterPath
      rating
      genreIds
      mediaType
    }
  }
`;

export const GET_ALL_GENRES_QUERY = gql`
  query GetAllGenres {
    getAllGenres {
      id
      name
    }
  }
`;

export const GET_ALL_STATUSES_QUERY = gql`
  query GetAllStatuses {
    getAllStatuses {
      id
      name
    }
  }
`;

export const GET_ALL_TYPES_QUERY = gql`
  query GetAllTypes {
    getAllTypes {
      id
      name
    }
  }
`;

export const GET_ALL_ENTRY = gql`
  query GetAllEntry {
    getAllEntry {
      title
      id
    }
  }
`;
