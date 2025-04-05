import { AuthTokenPayload, ShowUser, signInInput, signUpInput, UserCreate } from "./types";
import { AlreadyExistsError, NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "./repositories";
import { compare, hash } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import { StringValue } from "ms"

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials!")
  }
}
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User with that email already exists")
  }
}

export class UserNotFoundError extends Error {
  constructor(findOption: string) {
    super(`User with ${findOption} wasn't found`)
  }
}


export class UsersService {
  private usersRepository: UsersRepository;
  private authTokenTTL: StringValue
  private hashSalt: number;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
    this.authTokenTTL = "6h";
    this.hashSalt = 10;
  }

  async signIn(data: signInInput): Promise<string> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
    const payload: AuthTokenPayload = { uid: user.id };
    const token = sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_TTL as StringValue }
    );

    return token
  }

  async signUp(data: signUpInput): Promise<{ user: ShowUser, token: string }> {
    const hashedPassword = await hash(data.password, this.hashSalt);

    const userData = {
      ...data,
      password: hashedPassword
    }
    try {
      var newUser = await this.usersRepository.createUser(userData);
    } catch (err) {
      if (err instanceof AlreadyExistsError) {
        throw new UserAlreadyExistsError();
      }
      throw err;
    }
    const token = sign(
      { userId: newUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_TTL as StringValue }
    );

    return { user: { ...newUser, password: undefined }, token: token }
  }

  async getUser(userId: number): Promise<ShowUser> {
    try {
      var user = await this.usersRepository.findById(userId)
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new InvalidCredentialsError()
      }
      throw err;
    }
    return { ...user, password: undefined }
  }
  async listFavoriteMovies(userId: number) {
    try {
      return await this.usersRepository.listFavoriteMovies(userId)
    } catch (err) {
      if (err instanceof NotFoundError) throw new InvalidCredentialsError()
      throw err;
    }
  }

}
