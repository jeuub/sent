import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation signUp($username: String!, $vkid: String!) {
    signUp(username: $username, vkid: $vkid)
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $vkid: String!) {
    signIn(username: $username, vkid: $vkid)
  }
`;

export const HAS_ACCOUNT = gql`
  mutation hasAccount($vkid: String!) {
    hasAccount(vkid: $vkid)
  }
`;
