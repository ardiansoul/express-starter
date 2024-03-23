import * as dotenv from "dotenv";

let configPath = "";
if (process.env.NODE_ENV === "development") configPath = ".env.development";
if (process.env.NODE_ENV === "staging") configPath = ".env.staging";
if (process.env.NODE_ENV === "production") configPath = ".env.production";

const envConfig = () => {
  dotenv.config({
    path: configPath,
  });
};

export default envConfig;
