import { PrismaClient } from '@prisma/client';
import { bookFactory } from './factories/book-factory';
import { authorFactory } from './factories/author-factory';
import { faker } from '@faker-js/faker';
import { userFactory } from './factories/user-factory';
import { userBookFactory } from './factories/user-book-factory';

const prisma = new PrismaClient();
async function main() {
  return prisma.$transaction(async (trx) => {
    let authors = [];
    for (let i = 0; i < 5; i++) {
      const newAuth = await authorFactory(trx);
      authors.push(newAuth);
    }
    let books = [];
    for (let i = 0; i < 20; i++) {
      const newBook = await bookFactory(trx, {
        authorId: faker.helpers.arrayElement(authors).id,
      });
      books.push(newBook);
    }
    for (let i = 0; i < 4; i++) {
      const newUser = await userFactory(trx, {});
      //pick random books
      const booksPicked = faker.helpers
        .shuffle(books)
        .slice(0, faker.number.int({ min: 5, max: books.length }));
      for (const book of booksPicked) {
        await userBookFactory(
          trx,
          { userId: newUser.id, bookId: book.id },
          book,
        );
      }
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
