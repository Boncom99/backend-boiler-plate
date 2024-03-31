import {gql} from "apollo-server-express";

export const typeDef = gql`
  type Book {
    title: String
    author: Author
  }
  type Query {
      books: [Book]
      book(id:Int!): Book
    }
`;