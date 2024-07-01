import { Request, Response } from "express";
import { logger } from "../utlis/logger";
import RoleHandler from "../handlers/Role";
import { ResponseHandler } from "../utlis/responseHandler";
import config from "../utlis/config";

// class RoleController {
//   private handler: RoleHandler;

//   constructor() {
//     this.handler = new RoleHandler();
//   }

//   @logger()
//   public async get(req: Request, res: Response): Promise<void> {
//     try {
//       const data = await this.handler.get(req.params.id);

//       if (data === null) {
//         new ResponseHandler(res, [404, "User not found", data], null);
//       } else {
//         new ResponseHandler(res, [200, "User successfully retrieved", data], null);
//       }
//     } catch (err) {
//       new ResponseHandler(res, null, err);
//     }
//   }

//   @logger()
//   public async getAll(req: Request, res: Response): Promise<void> {
//     try {
//       const { filter } = req.query;
//       const data = await this.handler.getAll(filter);

//       new ResponseHandler(res, [200, "Users successfully retrieved", data], null);
//     } catch (err) {
//       new ResponseHandler(res, null, err);
//     }
//   }

//   @logger()
//   public async create(req: Request, res: Response): Promise<void> {
//     try {
//       const data = await this.handler.create(req.body);
//       new ResponseHandler(res, [201, "User successfully created", data], null);
//     } catch (err) {
//       new ResponseHandler(res, null, err);
//     }
//   }
// }

// export default RoleController;

class RoleController {
  public getById(req: Request, res: Response): void {
    res.send(`${config.API_VERSION} getById`);
  }

  public getAll(req: Request, res: Response): void {
    res.send("getAll");
  }

  public create(req: Request, res: Response): void {
    res.send("create");
  }

  public update(req: Request, res: Response): void {
    res.send("update");
  }

  public delete(req: Request, res: Response): void {
    res.send("delete");
  }
}

export default new RoleController();

// we need to write a service for the role controller and connect it to repository
// reference from this https://chatgpt.com/c/35738bd4-80b4-4587-8d2b-3c7f3279fc8a
// https://www.baeldung.com/java-entity-vs-dto#:~:text=The%20combination%20of%20both%20entities,robust%20and%20maintainable%20software%20solutions.
