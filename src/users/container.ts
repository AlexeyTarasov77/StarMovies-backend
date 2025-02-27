import { UsersHandlers } from "./handlers";
import { UserService } from "./services";
import { UserRepository } from "./repositories";

export class Container {
  handlers: UsersHandlers;

  constructor() {
    const userRepository = new UserRepository(); 
    const userService = new UserService(userRepository); 
    this.handlers = new UsersHandlers(userService); 
  }
}

export const container = new Container();
