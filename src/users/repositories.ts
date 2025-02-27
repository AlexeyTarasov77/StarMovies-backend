import { Prisma } from "@prisma/client";
import { IUser } from "../movies/interfaces";
import { NotFoundErrCode, prisma } from "../prisma";
import { NotFoundError } from "../core/repository";


export class UsersRepository {
    async list(): Promise<IUser[]>{
        return await prisma.user.findMany({})
    }
    async getOne(data: IUser): Promise<IUser>{
        return await prisma.user.findUniqueOrThrow({
            where: { email: data.email }
        })
    }
    async createOne(data:Prisma.UserCreateInput): Promise<IUser>{
        try {
            return await prisma.user.create({
                data: data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode)
                    throw new NotFoundError
            }
            throw error
        }
    }
}