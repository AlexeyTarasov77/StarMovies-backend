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

    async updateOne(id: number, data: Prisma.UserUpdateInput): Promise<IUser> {
        const currentUser = await prisma.user.findUniqueOrThrow({
            where: {
                id: id,
            },
        });

        if (data.avatarUrl && typeof data.avatarUrl !== "string") {
            data.avatarUrl = null;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data,
        });
        return updatedUser;
    }

    async deleteOne(id: number): Promise<IUser> {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        return user;
    }
}
