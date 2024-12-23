import { Prisma } from "@prisma/client"
import { NotFoundError } from "@prisma/client/runtime/library"


export function NotFoundMovieError(err: unknown): void{
    // if (err instanceof Prisma.NotFoundError){
    //     throw NotFoundError
    // }
    if (err instanceof Prisma.PrismaClientKnownRequestError){
        if (err.code === "P2025"){
            console.log("error")
            throw err
        }
    }
}
