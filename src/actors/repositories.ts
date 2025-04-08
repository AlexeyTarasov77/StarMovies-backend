import { IActor } from "../movies/types";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class ActorsRepository {
    async list(): Promise<IActor[]> {
        return await prisma.actor.findMany({
            include: {
                country: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async getOne(id: number): Promise<IActor> {
        try {
            return await prisma.actor.findUniqueOrThrow({
                where: { id },
                include: {
                    country: true,
                },
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
}