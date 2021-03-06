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

export const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      content
      id
      author {
        username
      }
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation Mutation($toggleFavoriteId: ID!) {
    toggleFavorite(id: $toggleFavoriteId) {
      favoriteCount
    }
  }
`;
