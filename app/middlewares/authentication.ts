import { AuthenticationError, ResponseHandler } from "../utlis/responseHandler";
import { NextFunction, Request, Response } from "express";
import { Role } from "../../database/entity/Role";
import HandlerFactory from "../handlers";

export class AuthMiddleware {
  constructor() {}

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    const authHandler = HandlerFactory.getInstance("Auth");
    // TODO
    // Change handler to factory for multiple get handler
    // get role and pass it to req.body for consume to validatePermission function
    try {
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      if (!token) {
        throw new AuthenticationError("Unauthorized");
      }

      const decryptedData = await authHandler.verifyToken(token);

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

  public async validatePermission(permission: string) {
    const roleHandler = HandlerFactory.getInstance("Role");
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        const role = await roleHandler.get(req.body.decryptedData.data.id);
        if (role.permissions.includes(permission)) {
          next();
        } else {
          throw new AuthenticationError("You don't have permission to perform this action");
        }
      } catch (err) {
        new ResponseHandler(res, null, err);
      }
    };
  }
}
