import AuthHandler from "../handlers/Auth";
import { AuthenticationError, ResponseHandler } from "../utlis/responseHandler";
import { decryptData, verifyToken } from "../utlis/encryption";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  private handler: AuthHandler;
  constructor() {
    this.handler = new AuthHandler();
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      if (!token) {
        throw new AuthenticationError("Unauthorized");
      }

      const decryptedData = await this.handler.verifyToken(token);

      if (decryptedData) {
        Object.assign(req.body, decryptedData);
        next();
      } else {
        throw new AuthenticationError("Unauthorized");
      }
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }
}
