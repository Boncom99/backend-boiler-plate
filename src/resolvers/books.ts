import {prisma} from "../database";
import {Book} from "@prisma/client";
export const bookResolvers= {
    Query: {
        books: () => {
            return prisma.book.findMany()
        },
    },
    Mutation: {
        createBook: async (_: any, args: Book) => {
            return prisma.book.create({
                data: {
                    title: args.title,
                    authorId: args.authorId
                }
            })
        },
    }
}