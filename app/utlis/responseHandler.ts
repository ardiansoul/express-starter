import { Response } from "express";

export interface IResponse {
  message: string;
  data: Record<string, string> | Array<any> | null;
  errors: Array<string> | null;
  status: "Success" | "Failed";
  statusCode: number;
}

export class ValidationError extends Error {
  public errors: any;
  public isDataExists: boolean;
  constructor(errors: any, isDataExists: boolean) {
    super("Validation Error");
    this.name = "ValidationError";
    this.errors = errors;
    this.isDataExists = isDataExists;
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ResponseHandler {
  private response: IResponse;
  constructor(
    res: Response,
    data: [number, string, Record<string, any> | Array<any>] | null,
    error: (ValidationError & NotFoundError & AuthenticationError & Error) | null
  ) {
    this.response = {
      data: null,
      errors: null,
      message: "",
      status: "Failed",
      statusCode: 0,
    };

    if (error !== null) {
      this.errorChecker(error).createResponse(res);
    } else {
      this.dataBuilder(data).createResponse(res);
    }
  }

  private errorChecker(error: (ValidationError & NotFoundError & AuthenticationError & Error) | null) {
    if (error !== null) {
      if (error.name === "ValidationError") {
        if (error.isDataExists) {
          this.response.statusCode = 409;
        } else {
          this.response.statusCode = 400;
        }
      } else if (error.name === "NotFoundError") {
        this.response.statusCode = 404;
      } else if (error.name === "AuthenticationError") {
        this.response.statusCode = 401;
      } else {
        this.response.statusCode = 500;
      }
      this.response.message = error.message;
      this.response.errors = error.errors;
      this.response.status = "Failed";
    }
    return this;
  }

  private dataBuilder(data: [number, string, Record<string, string> | Array<any>]) {
    if (data !== null) {
      this.response.data = data[2];
      this.response.message = data[1];
      this.response.statusCode = data[0];
      this.response.status = "Success";
      this.response.errors = null;
    }

    return this;
  }

  public createResponse(res: Response) {
    const { statusCode, ...resp } = this.response;
    res.status(statusCode).json(resp);
    return;
  }
}
