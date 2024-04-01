import {prisma} from "../database";
import {Book} from "@prisma/client";
export const bookResolvers= {
    Query: {
        books: () => {
            return prisma.book.findMany({include: {author: true}})
        },
        bookById: async (_: any, args: any) => {
            return prisma.book.findUnique({
                where: {
                    id: args.id
                },
                include: {
                    author: true
                }
            })
        }
    },
    Mutation: {
        createBook: async (_: any, args: Book) => {
            return prisma.book.create({
                data: {
                    title: args.title,
                    authorId: args.authorId
                }  ,
                include: {
                    author: true
                }
            })
        },
    }
}