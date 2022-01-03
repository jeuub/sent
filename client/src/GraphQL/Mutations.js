import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation signUp($username: String!, $vkid: String!) {
    signUp(username: $username, vkid: $vkid)
  }
`;
