import * as express from "express";
import RoleController from "../../controllers/Role";
import api_paths from "../api_path";

export default class RoleRoutes {
  private router: express.Router;
  private apiPath: typeof api_paths.role;
  private controller: RoleController;
  constructor() {
    this.router = express.Router();
    this.apiPath = api_paths.role;
    this.controller = new RoleController();
  }

  setupRoutes() {
    this.router.get(this.apiPath.get_all, this.controller.getAll.bind(this.controller));
    this.router.get(this.apiPath.get, this.controller.get.bind(this.controller));
    this.router.post(this.apiPath.add, this.controller.create.bind(this.controller));
    return this.router;
  }
}
