import { Application } from "express";
import { IRouteConfig } from "..";
import roleController from "../../controllers/role.controller";
import { validateRequest } from "../../utlis/validateRequest";
import { RoleRequest } from "../../dtos/Role";

export default class RoleRoutes implements IRouteConfig {
  app: Application;
  name: string = "Role";
  constructor(app: Application) {
    this.app = app;
    this.configureRoutes();
  }

  configureRoutes(): Application {
    this.app.route("/roles").get(roleController.getAll).post(validateRequest(RoleRequest), roleController.create);

    this.app.route("/roles/:id").get(roleController.getById).put(roleController.update).delete(roleController.delete);

    return this.app;
  }
}
