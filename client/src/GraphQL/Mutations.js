import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $vkid: String!) {
    signUp(username: $username, vkid: $vkid)
  }
`;
