import { Request, Response } from "express";

import { apiVersion } from "../server";

class CoreHandlers {
  healthcheckHandler = (req: Request, res: Response) => {
    res.json({
      status: "available",
      version: apiVersion,
    });
  };
}

export const coreHandlers = new CoreHandlers();