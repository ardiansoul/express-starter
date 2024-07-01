import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ResponseHandler, ValidationError } from "./responseHandler";

export function validateRequest(validator: ClassConstructor<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(validator, req.body);
      const data = plainToInstance(validator, req.body);
      console.log(data, "Data");
      const errors = await validate(data, { stopAtFirstError: true });
      console.log(errors);
      if (errors.length > 0) {
        throw new ValidationError(
          `Validation failed: ${errors.map((error) => Object.values(error.constraints)).join(", ")}`,
          false
        );
      }

      next();
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  };
}
