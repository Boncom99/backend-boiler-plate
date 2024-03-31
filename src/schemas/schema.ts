import { typeDef as BookTypeDef,} from './book';
import * as path from 'path';
import {gql} from "apollo-server-express";


export const Query = gql`
  type Query {
    _empty: String
  }
`;

//provisional
export const globalTypeDefs=gql`
    type Book {
        id: ID
        title: String
        authorId: Int
        author: Author
    }
    type Query {
        books: [Book]
        book(id:Int!): Book
        authors: [Author]
        author(id:Int!): Author
    }
    type Mutation {
        createBook(title: String!, authorId: Int!): Book
        createAuthor(name: String!): Author
    }

    type Author{
        id: ID
        name: String
        created_at: String
        updated_at: String
        books: [Book]
    }
`

// export const typeDefs = [  BookTypeDef,];
 export const typeDefs = [  globalTypeDefs];

