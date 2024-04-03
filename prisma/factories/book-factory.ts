import { faker } from '@faker-js/faker';
import { Book } from '@prisma/client';

export const bookFactory = (prisma, book: Partial<Book>) => {
  if (!book.authorId) {
    throw new Error('Author id is required');
  }
  const input = {
    title: faker.lorem.words(3),
    pages: faker.number.int({ min: 10, max: 500 }),
    publishedAt: faker.date.recent(),
    isbn: faker.number
      .int({ min: 1000000000000, max: 9999999999999 })
      .toString(),
    imageLink: '',
    language: faker.helpers.arrayElement(['en', 'fr', 'es', 'de', 'it']),
    ...book,
  };
  return prisma.book.create({ data: input });
};
