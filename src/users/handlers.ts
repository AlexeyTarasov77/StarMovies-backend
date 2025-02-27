import { HTTPNotFoundError } from "../core/http-errors";
import { UserAlreadyExist, UserService } from "./services";

export class UsersHandlers {
  constructor(public service: UserService) {
    this.service = service;
  }
  public authRegister = async (req: Request, res: Response) => {
    try {
      const user = await this.service.authRegister(data);
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof UserAlreadyExist) {
        throw new HTTPNotFoundError(err.message);
      }
      throw err;
    }
  };
}
