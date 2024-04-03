import { bookResolvers } from './books';
import { authorResolvers } from './author';
export const resolvers = {
  Query: {
    ...authorResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
};
