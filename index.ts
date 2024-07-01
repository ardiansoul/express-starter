// import dependencies
import * as express from "express";
import { json } from "body-parser";
import * as morgan from "morgan";
import Routes from "./app/routes";
import config from "./app/utlis/config";

const app: express.Application = express();

app.use(morgan("dev", {}));
app.use(json());

new Routes(app);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT} with environment ${config.NODE_ENV}`);
});
