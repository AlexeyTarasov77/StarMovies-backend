import { Prisma } from "@prisma/client";
import { z } from "zod"
import { signInSchema, signUpSchema } from "./schemas";

export interface IUsersRepo {
    list(): Promise<UserCreate[]>;
    getOne(userId: number): Promise<UserCreate>;
    createOne(data: Prisma.UserCreateInput): Promise<UserCreate>;
    updateOne(userId: number, data: Prisma.UserUpdateInput): Promise<UserCreate>;

}

export type AuthTokenPayload = { uid: number }

export type UserCreate = Prisma.UserUncheckedCreateInput
export type User = UserCreate & { id: number }
export type ShowUser = Omit<User, "password"> & { password: undefined }

export type signInInput = z.infer<typeof signInSchema>
export type signUpInput = z.infer<typeof signUpSchema>
