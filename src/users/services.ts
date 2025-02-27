import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "../movies/interfaces";

export class UserAlreadyExist extends Error {
    constructor(data: IUser){
        super(`User with email ${data.email} already exist`)
    }
}


interface IUserRepo {
  list(): Promise<IUser[]>;
  getOne(email: string): Promise<IUser>;
  createOne(data: {}): Promise<IUser>;
}

export class UserService {
  constructor(public userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async authRegister(data: IUser) {
    const user = await this.userRepo.getOne(data.email);

    if (user) {
      return { status: "error", message: "user exists" };
    }
    const hashedPassword = await hash(data.password, 10);
    const hashedUserData = {
      ...data,
      password: hashedPassword,
    };
    const newUser = await this.userRepo.createOne(hashedUserData);
    if (typeof newUser === "string") {
      return { status: "error", message: "something wrong" };
    }
    if (!newUser) {
      return { status: "error", message: "User wasn`t created successfully" };
    }
    const token = sign(String(newUser.id), SECRET_KEY, { expiresIn: "1d" });
    return { status: "ok", data: token };
  }
}
