import { faker } from "@faker-js/faker";
import {Book, Prisma, PrismaClient, readingSession, UserBook} from "@prisma/client";


export const userBookFactory = async (prisma, userBook: Partial<UserBook>,book:Book, numberOfReadingSessions?:number)=>{
    if(!userBook.userId || !userBook.bookId){
        throw new Error("User id and book id are required")
    }
    const newUserBook=await prisma.userBook.create({data:userBook})
    const readingSessions:Partial<readingSession>[] = []
    //generate reading sessions
    let lastPage = 0
    for(let i=0; i<numberOfReadingSessions||faker.number.int({min:2, max:10}); i++){
        const startPage =lastPage
        const endPage =  Math.min(startPage+faker.number.int({min:1,max:20}) ,book.pages)
        const readingSessionInput={
            userBookId: newUserBook.id,
            realisedAt: faker.date.recent(),
            startPage,
            endPage,
        }
        readingSessions.push(readingSessionInput)
        if(endPage===book.pages){
            break;
        }
        lastPage=endPage
    }
    return prisma.readingSession.createMany({data: readingSessions})
    
}
