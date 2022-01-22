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
          vkid
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

export const ME = gql`
  query mySent {
    me {
      username
      notes {
        content
        favoriteCount
        favoritedBy {
          username
          vkid
        }
      }
    }
  }
`;
