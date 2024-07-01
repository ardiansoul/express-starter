import { Router, Application } from "express";
const routes = Router();
import V_1 from "./V_1";
import testRoute from "./testing";
import RoleRoutes from "./V_1/Role";
import UserRoutes from "./V_1/User";

// export abstract class RouteConfig {
//   app: Application;
//   name: string;
//   constructor(app: Application, name: string) {
//     this.app = app;
//     this.name = name;
//     this.configureRoutes();
//   }

//   abstract configureRoutes(): Application;
// }

export interface IRouteConfig {
  app: Application;
  name: string;
  configureRoutes(): Application;
}

type RouteClassConstructor<T extends IRouteConfig> = new (app: Application) => T;

class RouteManager {
  private routeClasses: Array<RouteClassConstructor<IRouteConfig>> = [];

  // Register a route class constructor
  public registerRoute<T extends IRouteConfig>(RouteClass: RouteClassConstructor<T>) {
    this.routeClasses.push(RouteClass);
  }

  // Initialize routes by instantiating route classes
  public initializeRoutes(app: Application) {
    this.routeClasses.forEach((RouteClass) => {
      const routeInstance = new RouteClass(app);
      console.log(`Route ${routeInstance.name} initialized`);
    });
  }
}

const routeManager = new RouteManager();
routeManager.registerRoute(RoleRoutes);

export default class Routes {
  constructor(app: Application) {
    routeManager.initializeRoutes(app);
  }
}
