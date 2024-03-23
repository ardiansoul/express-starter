// import dependencies
import * as express from "express";
import { json } from "body-parser";
import * as morgan from "morgan";
import envConfig from "./app/utlis/envConfig";
import routes from "./app/routes";
import { AppDataSource } from "./database/data-source";
import authRoute from "./app/routes/authRoute";

class Server {
  private errorCount: number;
  private app: express.Application;
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.start();
    this.errorCount = 0;
  }

  private setupMiddlewares(): void {
    envConfig();
    this.app.use(
      morgan("dev", {
        // stream: createWriteStream(path.join(__dirname, "debug.log"), { flags: "a" }),
      })
    );
    this.app.use(json());
  }
  private setupRoutes(): void {
    this.app.use("/api/", routes);
    // this.app.use("/auth", authRoute);
    this.app.use("/auth/", authRoute);
    this.app.use("/", (req, res) => {
      res.send("api connected");
    });
  }

  private start(): void {
    const port = process.env.PORT || 5000;
    AppDataSource.initialize()
      .then((value) => {
        console.log(`Database connected`);
        this.app.listen(port, () => {
          console.log(`app running in port ${port}`);
        });
      })
      .catch((err) => {
        console.log(err);
        if (this.errorCount < 5) {
          console.log("Trying to reconnect...");
          setTimeout(() => {
            this.errorCount++;
            this.start();
          }, 5000);
        } else {
          process.exit(1);
        }
      });
  }
}

new Server();
