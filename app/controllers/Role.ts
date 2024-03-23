import { Request, Response } from "express";
import { logger } from "../utlis/logger";
import RoleHandler from "../handlers/Role";
import { ResponseHandler } from "../utlis/responseHandler";

class RoleController {
  private handler: RoleHandler;

  constructor() {
    this.handler = new RoleHandler();
  }

  @logger()
  public async get(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.handler.get(req.params.id);

      if (data === null) {
        new ResponseHandler(res, [404, "User not found", data], null);
      } else {
        new ResponseHandler(res, [200, "User successfully retrieved", data], null);
      }
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  @logger()
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { filter } = req.query;
      const data = await this.handler.getAll(filter);

      new ResponseHandler(res, [200, "Users successfully retrieved", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  @logger()
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.handler.create(req.body);
      new ResponseHandler(res, [201, "User successfully created", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }
}

export default RoleController;
