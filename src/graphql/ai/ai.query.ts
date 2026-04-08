import { gql } from "@apollo/client";

export const GENERATE_TEXT_AI = gql`
  query GenerateTextAi($input: String!) {
    generateTextAi(prompt: $input)
  }
`;
