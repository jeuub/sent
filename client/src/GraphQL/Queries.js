import { gql } from "@apollo/client";

export const fetchFeed = gql`
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
