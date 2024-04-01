import { faker } from "@faker-js/faker";
import {Book} from "@prisma/client";
//  id        Int      @id @default(autoincrement())
//   title     String
//   author    Author   @relation(fields: [authorId], references: [id])
//   authorId  Int
//   publishedAt DateTime
//   pages     Int
//   isbn      Int
//   imageLink String
//   language  String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   userBooks UserBook[]
export const bookFactory = (prisma, book: Partial<Book>)=>{
    if(!book.authorId){
        throw new Error("Author id is required")
    }
    const input={
        title: faker.lorem.words(3),
        pages: faker.number.int({min: 10, max: 500}),
        publishedAt: faker.date.recent(),
        isbn: faker.number.int({min: 1000000000000, max: 9999999999999}).toString(),
        imageLink: '',
        language: faker.helpers.arrayElement(['en', 'fr', 'es', 'de', 'it']),
        ...book,
    }
    return prisma.book.create({data:input})
}
