import { gql } from "@apollo/client";

export const CREATE_ENTRY_MUTATION = gql`
  mutation CreateEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      description
      title
    }
  }
`;
