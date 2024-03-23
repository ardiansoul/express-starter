import { Request, Response } from "express";

export type initController = (req: Request, res: Response) => Promise<void>;

export class BaseController {
  public handler: any;
  constructor(handler: any) {
    this.handler = new handler();
  }
}
