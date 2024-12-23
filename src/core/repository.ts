import { Prisma } from "@prisma/client"
// import { NotFoundError } from "@prisma/client/runtime/library"

export class NotFoundError extends Error{
    constructor(error: Error){ 
        super()

    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2025"){
            console.log("error")
            throw error
        }
    }}
}



