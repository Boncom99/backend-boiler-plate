import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const userFactory = (prisma, user: Partial<User>) => {
  const input = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    bio: faker.lorem.sentence(),
    ...user,
  };
  return prisma.user.create({ data: input });
};
