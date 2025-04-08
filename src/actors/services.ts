import { IActor, IActorsRepo, } from "../movies/types";
import { NotFoundError } from "../core/repository";

export class ActorNotFoundError extends Error {
    constructor(actorId: number) {
        super(`Actor with id ${actorId} not found`);
    }
}

export class ActorsService {
    constructor(public actorsRepo: IActorsRepo,) { }

    async listActors(): Promise<IActor[]> {
        return await this.actorsRepo.list();
    }
    async getOneActor(actorId: number): Promise<IActor> {
        try {
            return await this.actorsRepo.getOne(actorId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ActorNotFoundError(actorId);
            }
            throw err;
        }
    }
}
