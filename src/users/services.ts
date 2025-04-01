import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser, IUsersRepo } from "./types";
import { NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";

export class UserNotFoundError extends Error {
    constructor(userId: number) {
        super(`User with id ${userId} not found`);
    }
}

export class UserAlreadyExist extends Error {
    constructor(data: IUser) {
        super(`User with email ${data.email} already exist`);
    }
}


export class UsersService {
    constructor(public usersRepo: IUsersRepo) {
        this.usersRepo = usersRepo;
    }

    async listUsers(): Promise<IUser[]> {
        return await this.usersRepo.list();
    }

    async getUser(userId: number): Promise<IUser> {
        try {
            return await this.usersRepo.getOne(userId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new UserNotFoundError(userId);
            }
            throw err;
        }
    }
    async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
        const hashedPassword = await hash(data.password, 10);

        const hashedUserData = {
            ...data,
            password: hashedPassword,
        };

        return await this.usersRepo.createOne(hashedUserData);
    }

    async updateUser(
            data: Prisma.UserUpdateInput,
            userId: number,
        ): Promise<IUser> {
            return await this.usersRepo.updateOne(userId, data);
        }

    //   async authRegister(data: IUser) {
    //     const user = await this.userRepo.createOne(data);
    //     if (user) {
    //       return { status: "error", message: "user exists" };
    //     }
    //     const hashedPassword = await hash(data.password, 10);
    //     const hashedUserData = {
    //       ...data,
    //       password: hashedPassword,
    //     };
    //     const newUser = await this.userRepo.createOne(hashedUserData);
    //     if (typeof newUser === "string") {
    //       return { status: "error", message: "something wrong" };
    //     }
    //     if (!newUser) {
    //       return { status: "error", message: "User wasn`t created successfully" };
    //     }
    //     const token = sign(String(newUser.id), SECRET_KEY, { expiresIn: "1d" });
    //     return { status: "ok", data: token };
    //   }
}
