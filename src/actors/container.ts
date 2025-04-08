import { ActorsHandlers } from "./handlers";
import { ActorsRepository } from "./repositories";
import { ActorsService } from "./services";

export class Container {
  handlers: ActorsHandlers;
  constructor() {
    const actorsRepo = new ActorsRepository();
    const actorsService = new ActorsService(actorsRepo);
    this.handlers = new ActorsHandlers(actorsService);
  }
}

export const container = new Container();
