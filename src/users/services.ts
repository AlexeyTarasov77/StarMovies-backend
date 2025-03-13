import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "../movies/interfaces";
import { NotFoundError } from "../core/repository";

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

interface IUsersRepo {
  list(): Promise<IUser[]>;
  getOne(userId: number): Promise<IUser>;
//   createOne(data: {}): Promise<IUser>;
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
