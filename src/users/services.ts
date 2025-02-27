import { IUser } from "../movies/interfaces";
import { NotFoundError } from "../core/repository";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserRepository } from "./repositories";
import { compare, hash } from "bcryptjs"
import { sign } from 'jsonwebtoken'

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async authUser(email: string, password: string): Promise<IUser | { status: string; token: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    if (!process.env.SECRET_JWT) {
      throw new Error("Missing SECRET_JWT in environment variables");
    }

    const token = sign(
      { id: user.id}, 
      process.env.SECRET_JWT,
      { expiresIn: process.env.JWT_EXPIRES_IN } 
    );

    return {status: 'success', token: token};
  }

  async registerUser(data: Prisma.UserCreateInput): Promise<IUser | { status: string; token: string }> {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (user) {
      throw new Error("User already exists");
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      ...data,
      password: hashedPassword
    }
    const newUser = await this.userRepository.createUser(userData);

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    
    const token = sign(
      { userId: newUser.id}, 
      process.env.SECRET_JWT!,
      { expiresIn: process.env.JWT_EXPIRES_IN } 
    );

    return {status: 'success', token: token}
  }
}
