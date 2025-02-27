import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HTTPNotFoundError, HTTPValidationError } from "../core/http-errors";
import { validateObjectId } from "../core/validation";
import { UserNotFoundError, UsersService } from "./services";


export class UsersHandlers {
  constructor(public service: UsersService) {
    this.service = service;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, nickname, age } = req.body;

      const existingUser = await this.service.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.service.createUser({
        email,
        password: hashedPassword,
        nickname,
        age,
      });

      res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.findUserByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_TTL || "1d",
      });

      res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
    } catch (err) {
      next(err);
    }
  };

  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = validateObjectId(req.user.id);
      const user = await this.service.getUserById(userId);

      if (!user) {
        throw new HTTPNotFoundError("User not found");
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
