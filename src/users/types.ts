import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createUserSchema, signInSchema, signUpSchema, updateUserSchema } from "./schemas";

export interface IUsersRepo {
    list(): Promise<UserCreate[]>;
    getOne(userId: number): Promise<UserCreate>;
    createOne(data: Prisma.UserCreateInput): Promise<UserCreate>;
    updateOne(userId: number, data: Prisma.UserUpdateInput): Promise<UserCreate>;
    deleteById(userId: number): Promise<void>;
}

export type AuthTokenPayload = { uid: number }

export type UserCreate = Prisma.UserUncheckedCreateInput
export type User = UserCreate & { id: number }
export type ShowUser = Omit<User, "password"> & { password: undefined }

export type signInInput = z.infer<typeof signInSchema>
export type signUpInput = z.infer<typeof signUpSchema>
export type createUserInput = z.infer<typeof createUserSchema>
export type updateUserInput = z.infer<typeof updateUserSchema>
