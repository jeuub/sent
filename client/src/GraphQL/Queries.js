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

export const myNote = graphql(
  gql`
    query User {
      me {
        notes {
          content
        }
      }
    }
  `,
  {
    options: {
      context: {
        Headers: {
          Authorization: localStorage.getItem("sent-token"),
        },
      },
    },
  }
);
