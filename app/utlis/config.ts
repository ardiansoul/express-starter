import * as dotenv from "dotenv";

export interface IConfig {
  PORT: string;
  NODE_ENV: string;
  API_VERSION: string;
  JWT_SECRET_KEY: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASSWORD: string;
  NODEMAILER_HOST: string;
  DATABASE_URL: string;
  ONE_SIGNAL_APP_ID: string;
  ONE_SIGNAL_API_KEY: string;
  ONE_SIGNAL_USER_AUTH_KEY: string;
}
class Config implements IConfig {
  PORT: string;
  NODE_ENV: string;
  API_VERSION: string;
  JWT_SECRET_KEY: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASSWORD: string;
  NODEMAILER_HOST: string;
  DATABASE_URL: string;
  ONE_SIGNAL_APP_ID: string;
  ONE_SIGNAL_API_KEY: string;
  ONE_SIGNAL_USER_AUTH_KEY: string;

  constructor() {
    if (!process.env.PORT) {
      this.getInstance();
    }
  }

  private getInstance(): void {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`,
    });

    this.PORT = process.env.PORT || "5000";
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.API_VERSION = process.env.API_VERSION || "v1";
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    this.NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
    this.NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
    this.NODEMAILER_HOST = process.env.NODEMAILER_HOST;
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
    this.ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
    this.ONE_SIGNAL_USER_AUTH_KEY = process.env.ONE_SIGNAL_USER_AUTH_KEY;
  }
}

export default new Config();
