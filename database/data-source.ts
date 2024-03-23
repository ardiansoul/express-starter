import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Role } from "./entity/Role";
import { UserSession } from "./entity/UserSession";
import { Token } from "./entity/Token";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "starter",
  synchronize: true,
  logging: ["query", "error"],
  entities: [User, Role, UserSession, Token],
  migrations: [],
  subscribers: [],
});
