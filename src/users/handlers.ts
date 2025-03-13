// import { HTTPNotFoundError } from "../core/http-errors";
import { validateObjectId } from "../core/validation";
import { UserNotFoundError, UsersService } from "./services";
import { NextFunction, Request, Response } from "express";

export class UsersHandlers {
  constructor(public service: UsersService) {
    this.service = service;
  }

  public listUsers = async (req: Request, res: Response) => {
    const users = await this.service.listUsers();
    res.status(200).json(users);
  };

  public getUser = async (req: Request, res: Response) => {
    const userId = validateObjectId(req.params.id);

    try {
      const user = await this.service.getUser(userId);
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        res.status(404).json({ message: err.message });
        return;
      }
      throw err;
    }
  };

  //   public authRegister = async (req: Request, res: Response) => {
  //     try {
  //       const user = await this.service.authRegister(data);
  //       res.status(200).json(user);
  //     } catch (err) {
  //       if (err instanceof UserAlreadyExist) {
  //         res.status(409)
  //       }
  //       throw err;
  //     }
  //   };
}
