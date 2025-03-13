import { UsersHandlers } from "./handlers";
import { Middlewares } from "./middlewares";
import { UsersRepository } from "./repositories";
import { UsersService } from "./services";

class Container {
    handlers: UsersHandlers
    middlewares: Middlewares
    constructor() {
      const usersRepo = new UsersRepository();
      const usersService = new UsersService(usersRepo)
      this.handlers = new UsersHandlers(usersService)
      this.middlewares = new Middlewares()
    }
}
export const container = new Container();
