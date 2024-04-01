import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

// Reset the database
async function reset() {
    await prisma.$transaction(async (trx) => {
        await trx.userBook.deleteMany()
        await trx.user.deleteMany()
        await trx.book.deleteMany()
        await trx.author.deleteMany()
    })
}
reset().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
