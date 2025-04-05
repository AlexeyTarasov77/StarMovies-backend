import { User } from "./types";
import { prisma, getErrorCode, ErrorCodes } from "../prisma";
import { AlreadyExistsError, NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";

export class UsersRepository {
  async findUnique(where: Prisma.UserWhereUniqueInput) {
    try {
      return await prisma.user.findUniqueOrThrow({ where });
    } catch (err) {
      if (getErrorCode(err) === ErrorCodes.NotFound) {
        throw new NotFoundError();
      }
      throw err;
    }
  }
  async findByEmail(email: string): Promise<User> {
    return await this.findUnique({ email })
  }

  async findById(id: number): Promise<User> {
    return await this.findUnique({ id })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await prisma.user.create({
        data
      });
    } catch (err) {
      if (getErrorCode(err) === ErrorCodes.AlreadyExists) {
        throw new AlreadyExistsError();
      }
      throw err;
    }
  }
  async listFavoriteMovies(userId: number) {
    try {
      const res = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { favouriteMovies: true } })
      return res.favouriteMovies
    } catch (err) {
      if (getErrorCode(err) == ErrorCodes.NotFound) throw new NotFoundError()
      throw err;
    }
  }
}
