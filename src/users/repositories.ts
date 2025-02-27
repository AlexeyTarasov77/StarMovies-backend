import { IUser } from "../movies/interfaces";
import { prisma, NotFoundErrCode } from "../prisma";
import { NotFoundError } from "../core/repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findUserByEmail(email: string): Promise<IUser> {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { email },
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
  
  async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
    try {
      return await prisma.user.create({
        data: data
      });
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }
}
