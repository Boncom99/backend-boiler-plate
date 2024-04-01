import { faker } from "@faker-js/faker";
import { User} from "@prisma/client";

//  id      Int      @id @default(autoincrement())
//   email   String   @unique
//   name    String?
//   bio    String?
//   userBooks UserBook[]

export const userFactory = (prisma, user: Partial<User>)=>{
    const input={
        email: faker.internet.email(),
        name: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        ...user,
    }
    return prisma.user.create({data:input})
}
