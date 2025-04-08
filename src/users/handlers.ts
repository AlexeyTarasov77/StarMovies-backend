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

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.service.createUser(req.body);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                res.status(404).json({ message: err.message });
                return;
            }
            throw err;
        }
    };
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }
            const user = await this.service.updateUser(req.body, userId);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                res.status(404).json({ message: err.message });
                return;
            }
            throw err;
        }
    };
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(req.body.id);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }
            const user = await this.service.deleteUser(userId);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                res.status(404).json({ message: err.message });
                return;
            }
            throw err;
        }
    }
}
