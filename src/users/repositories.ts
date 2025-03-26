import { IUser } from "./types";
import { NotFoundErrCode, prisma } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export class UsersRepository {
    async list(): Promise<IUser[]> {
        return await prisma.user.findMany({});
    }
 
    async getOne(id: number): Promise<IUser> {
        try {
            return await prisma.user.findUniqueOrThrow({
                where: { id },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) {
                    throw new NotFoundError("Not found");
                }
            }
            throw error;
        }
    }

    async createOne(data: Prisma.UserCreateInput): Promise<IUser> {
        try {
            
            return await prisma.user.create({
                data: data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === NotFoundErrCode) throw new NotFoundError();
            }
            throw error;
        }
    }
}
