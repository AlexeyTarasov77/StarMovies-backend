import { UsersHandlers } from "./handlers";
import { UsersService } from "./services";
import { UsersRepository } from "./repositories";

export class Container {
  handlers: UsersHandlers;

  constructor() {
    const userRepository = new UsersRepository();
    const userService = new UsersService(userRepository);
    this.handlers = new UsersHandlers(userService);
  }
}

export const container = new Container();
