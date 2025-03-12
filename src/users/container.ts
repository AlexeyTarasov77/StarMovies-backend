import { UsersHandlers } from "./handlers";
import { Middlewares } from "./middlewares";
import { UsersRepository } from "./repositories";
import { UserService } from "./services";

class Container {
  //   handlers: UsersHandlers
  //   middlewares: Middlewares
  //   constructor() {
  //     const userRepo = new UsersRepository();
  //     const userService = new UserService(userRepo)
  //     this.handlers = new UsersHandlers(userService)
  //     this.middlewares = new Middlewares()
  //   }
}
export const container = new Container();
