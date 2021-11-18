const { gql } = require('apollo-server-express');

module.exports = gql `
  scalar DateTime
  type Note {
    id: ID!,
    content: String!,
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User!]
  },
  
  type User {
    id: ID!
    username: String!
    vkid: String!
    notes: [Note!]!
    favorites: [Note!]  
  },

  type NoteFeed {
    notes: [Note!]!
    cursor: String!
    hasNextPage: Boolean!
  },


  type Query {
    notes: [Note!]!
    note(id:ID!): Note!
    user(username: String):User!
    users: [User!]
    me: User!
    noteFeed(cursor: String):NoteFeed!
  },

  type Mutation {
    newNote(content: String!): Note!
    signUp(username: String!, vkid: String!): String!
    signIn(username: String!, vkid: String!): String!
    toggleFavorite(id:ID!): Note!
  },
`;