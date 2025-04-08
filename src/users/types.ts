import { Prisma } from "@prisma/client";
import { IReview } from "../movies/types";

export interface IUsersRepo {
    list(): Promise<IUser[]>;
    getOne(userId: number): Promise<IUser>;
    createOne(data: Prisma.UserCreateInput): Promise<IUser>;
    updateOne(userId: number, data: Prisma.UserUpdateInput): Promise<IUser>;
    deleteOne(userId: number):Promise<IUser>;

}


export interface IUser {
    id: number;
    username: string;
    email?: string;
    avatarUrl?: string | null;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    reviews?: IReview[];
}