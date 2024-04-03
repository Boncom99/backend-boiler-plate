import { faker } from '@faker-js/faker';
import { Author } from '@prisma/client';

export const authorFactory = (prisma, author?: Partial<Author>) => {
  const input = {
    name: faker.person.fullName(),
    ...author,
  };
  return prisma.author.create({ data: input });
};
