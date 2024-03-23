import { Router } from "express";
const routes = Router();
import V_1 from "./V_1";
import testRoute from "./testing";

// root route
routes.get("/", (req, res) => {
  res.send("router api");
});

// use route
routes.use("/v1", V_1);

routes.use("/testing", testRoute);

export default routes;
