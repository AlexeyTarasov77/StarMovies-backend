import { Request, Response } from "express";
import { ActorsService } from "./services";
import { HTTPNotFoundError } from "../core/http-errors";
import { getSuccededResponse } from "../core/utils";
import { validateObjectId } from "../core/validation";
import { ActorNotFoundError } from "./services"


export class ActorsHandlers {
    constructor(private actorsService: ActorsService) {}

    public listActors = async (req: Request, res: Response) => {
        const actors = await this.actorsService.listActors();
        res.status(200).json(getSuccededResponse(actors));
    };

    public getOneActor = async (req: Request, res: Response) => {
        try {
            const actorId = validateObjectId(req.params.id);
            const actor = await this.actorsService.getOneActor(actorId);
            res.status(200).json(getSuccededResponse(actor));
        } catch (err) {
            if (err instanceof ActorNotFoundError) {
                throw new HTTPNotFoundError(err.message);
            }
            throw err;
        }
    };

}

