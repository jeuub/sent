import { gql } from "@apollo/client";

export const FETCH_FEED = gql`
  query Query {
    noteFeed {
      notes {
        id
        content
        author {
          username
          id
        }
        createdAt
        favoriteCount
      }
      cursor
      hasNextPage
    }
  }
`;

export const MY_NOTE = gql`
  query myNote {
    me {
      notes {
        content
      }
    }
  }
`;
