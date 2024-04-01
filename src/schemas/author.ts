import {gql} from "apollo-server-express";

export const typeDef = gql`

  type Author{
      id: ID
      name: String
      created_at: String
      updated_at: String
  }
`;

export const query =gql `
   type Query {
        authors: [Author]
        authorById(id:Int!): Author
    }
    `;