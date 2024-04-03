import { prisma } from '../../prisma/prisma';
export const authorResolvers = {
  Query: {
    authors: () => {
      return prisma.author.findMany({ include: { books: true } });
    },
    authorById: async (_: any, args: any) => {
      return prisma.author.findUnique({
        where: {
          id: args.id,
        },
        include: {
          books: true,
        },
      });
    },
  },
  Mutation: {
    createAuthor: async (_: any, args: any) => {
      return prisma.author.create({
        data: {
          name: args.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          books: true,
        },
      });
    },
  },
};
