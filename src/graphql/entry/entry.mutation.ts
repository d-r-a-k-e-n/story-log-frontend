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

export const DELETE_ENTRY_MUTATION = gql`
  mutation DeleteEntry($id: Int!) {
    deleteEntry(id: $id) {
      id
      title
    }
  }
`;
