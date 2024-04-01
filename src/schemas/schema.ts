import { typeDef as BookTypeDef,} from './book';
import * as path from 'path';
import {gql} from "apollo-server-express";


// export const Query = gql`
//   type Query {
//     _empty: String
//   }
// `;

//provisional
export const globalTypeDefs=gql` 
    type Author{
        id: ID
        name: String
        created_at: String
        updated_at: String
        books: [Book]
    }
    
    type Book {
        id: ID
        title: String
        authorId: Int
        author: Author
    }
    type Query {
        books: [Book]
        bookById(id:Int!): Book
        authors: [Author]
        authorById(id:Int!): Author
    }
    type Mutation {
        createBook(title: String!, authorId: Int!): Book
        createAuthor(name: String!): Author
    }
`

// export const typeDefs = [  BookTypeDef,];
 export const typeDefs = [  globalTypeDefs];

