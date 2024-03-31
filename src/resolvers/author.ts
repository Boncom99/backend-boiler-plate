import {prisma} from "../database";
export const authorResolvers= {
    Query: {
        authors: () => {
            return prisma.author.findMany()
        },
    },
    Mutation: {
        createAuthor: async (_: any, args: any) => {
            return prisma.author.create({
                data: {
                    name: args.name,
                    createdAt:  new Date(),
                    updatedAt: new Date()
                }
            })
        },
    }
}