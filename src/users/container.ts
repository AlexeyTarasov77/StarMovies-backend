import { UsersHandlers } from "./handlers";
import { UsersService } from "./services";
import { UsersRepository } from "./repositories";
import { UsersMiddlewares } from "./middlewares";

export class Container {
  handlers: UsersHandlers;
  middlewares: UsersMiddlewares;

  constructor() {
    const userRepository = new UsersRepository();
    const userService = new UsersService(userRepository);
    this.handlers = new UsersHandlers(userService);
    this.middlewares = new UsersMiddlewares()
  }
}

export const container = new Container();
