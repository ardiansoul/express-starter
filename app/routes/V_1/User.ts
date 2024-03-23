import * as express from "express";
import UserController from "../../controllers/User";
import api_paths from "../api_path";

export default class UserRoutes {
  private router: express.Router;
  private apiPath: typeof api_paths.user;
  private controller: UserController;
  constructor() {
    this.router = express.Router();
    this.apiPath = api_paths.user;
    this.controller = new UserController();
  }

  setupRoutes() {
    this.router.get(this.apiPath.get_all, this.controller.getAll.bind(this.controller));
    this.router.get(this.apiPath.get, this.controller.get.bind(this.controller));
    this.router.post(this.apiPath.add, this.controller.create.bind(this.controller));
    return this.router;
  }
}
