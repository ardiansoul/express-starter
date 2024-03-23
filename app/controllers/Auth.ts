import { Request, Response } from "express";
import { logger } from "../utlis/logger";
import { ResponseHandler } from "../utlis/responseHandler";
import AuthHandler from "../handlers/Auth";

class AuthController {
  private handler: AuthHandler;
  constructor() {
    this.handler = new AuthHandler();
  }

  @logger()
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      const { "user-agent": userAgent } = req.headers;
      const data = await this.handler.login({ email, password, deviceInfo: userAgent });

      if (data === null) {
        new ResponseHandler(res, [404, "User not found", data], null);
        return;
      }
      new ResponseHandler(res, [200, "User successfully logged in", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.handler.register(req.body);
      if (data === null) {
        new ResponseHandler(res, [404, "User not found", data], null);
        return;
      }
      new ResponseHandler(res, [200, "User successfully registered", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.handler.refreshToken(req.body.decryptedSession, req.body.data);
      if (data === null) {
        new ResponseHandler(res, [404, "User not found", data], null);
        return;
      }
      new ResponseHandler(res, [200, "Token successfully refreshed", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      const { decryptedSession } = req.body;
      const data = await this.handler.logout(decryptedSession);
      if (data === null) {
        new ResponseHandler(res, [404, "User not found", data], null);
        return;
      }

      new ResponseHandler(res, [200, "User successfully logged out", data], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      await this.handler.forgotPassword(email);

      new ResponseHandler(res, [200, "Password reset link sent", null], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { password } = req.body;
      const { code } = req.params;

      await this.handler.resetPassword(code, password);

      new ResponseHandler(res, [200, "Password successfully reset", null], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const {
        oldPassword,
        newPassword,
        decryptedSession: { userId },
      } = req.body;

      await this.handler.changePassword(userId, newPassword, oldPassword);

      new ResponseHandler(res, [200, "Password successfully changed", null], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      await this.handler.verifyEmail(code);

      new ResponseHandler(res, [200, "Email successfully verified", null], null);
    } catch (err) {
      new ResponseHandler(res, null, err);
    }
  }
}

export default AuthController;
