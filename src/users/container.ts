import { UsersHandlers } from "./handlers";
import { Middlewares } from "./middlewares";

class Container {
    handlers: UsersHandlers;
    middlewares: Middlewares;

    constructor() {
        this.handlers = new UsersHandlers();
        this.middlewares = new Middlewares();
    }
}
export const container = new Container();
