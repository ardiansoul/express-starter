import ServiceFactory from "../services";
import Message from "../services/ThirdParty/Message";
import {
  comparePassword,
  decryptData,
  encryptData,
  encryptPassword,
  generateToken,
  verifyToken,
} from "../utlis/encryption";
import { generateCode, generateExpiredAt } from "../utlis/generate";
import { AuthenticationError, ValidationError } from "../utlis/responseHandler";

export default class AuthHandler {
  constructor() {}

  public async login({ deviceInfo, email, password }: { email: string; password: string; deviceInfo: string }) {
    const userService = ServiceFactory.getInstance("User");
    const userSessionService = ServiceFactory.getInstance("UserSession");

    const userExist = await userService.getByEmail(email);
    if (userExist && comparePassword(password, userExist.password)) {
      const session = encryptData(
        await userSessionService.create({
          userId: userExist.id,
          deviceInfo: deviceInfo,
          expireAt: generateExpiredAt(7, "day"),
        })
      );

      const token = generateToken({
        session,
        data: { email: userExist.email, roleId: userExist.roleId, username: userExist.username },
      });

      return { token };
    }

    throw new ValidationError("Wrong email or password", true);
  }

  public async register(body: any) {
    const userService = ServiceFactory.getInstance("User");
    const roleService = ServiceFactory.getInstance("Role");

    const userExist = await userService.getByEmail(body.email);

    const roleExist = await roleService.get(body.roleId);

    if (!userExist && roleExist) {
      const result = await userService.create(body);
      await this.sendVerificationEmail(body.email);
      return result;
    }

    throw new ValidationError("User already exists", true);
  }

  public async logout(decryptedSession: Record<string, any>) {
    const userSessionService = ServiceFactory.getInstance("UserSession");

    return await userSessionService.delete(decryptedSession.id);
  }

  public async verifyToken(token: string) {
    const userSessionService = ServiceFactory.getInstance("UserSession");

    const { session, data } = verifyToken(token);
    const decryptedSession = decryptData(session);

    if (await userSessionService.get(decryptedSession.id)) {
      if (new Date(decryptedSession.expireAt).getTime() > new Date().getTime()) {
        return { decryptedSession, data };
      } else {
        throw new AuthenticationError("Session expired");
      }
    } else {
      throw new AuthenticationError("Unauthorized");
    }
  }

  public async refreshToken(decryptedSession: Record<string, any>, data: Record<string, any>) {
    const userSessionService = ServiceFactory.getInstance("UserSession");

    await userSessionService.delete(decryptedSession.id);

    const session = encryptData(
      await userSessionService.create({
        userId: decryptedSession.userId,
        deviceInfo: decryptedSession.deviceInfo,
        expireAt: generateExpiredAt(7, "day"),
      })
    );

    const token = generateToken({
      session,
      data,
    });

    return { token };
  }

  public async forgotPassword(email: string) {
    const userService = ServiceFactory.getInstance("User");
    const tokenService = ServiceFactory.getInstance("Token");
    const emailService = new Message.EmailService();
    const userExist = await userService.getByEmail(email);

    if (userExist) {
      const { code } = await tokenService.create({
        userId: userExist.id,
        code: generateCode(),
        expireAt: generateExpiredAt(1, "hour"),
        type: "password_reset",
      });

      emailService.send({
        to: userExist.email,
        subject: "Reset Password",
        message: `http://localhost:${process.env.PORT || 5000}/auth/reset-password/${code}`,
        html: `<a href="http://localhost:${process.env.PORT || 5000}/auth/reset-password/${code}">Reset Password</a>`,
        from: process.env.NODEMAILER_EMAIL,
      });
    }

    return;
  }

  public async resetPassword(code: string, password: string) {
    const tokenService = ServiceFactory.getInstance("Token");

    const codeExist = await tokenService.getByCode(code, "password_reset");

    if (codeExist) {
      const userService = ServiceFactory.getInstance("User");
      await userService.update(codeExist.userId, {
        password: encryptPassword(password),
      });
    }
  }

  public async changePassword(userId: string, newPassword: string, oldPassword: string) {
    const userService = ServiceFactory.getInstance("User");

    if (oldPassword) {
      const userExist = await userService.get(userId);
      if (comparePassword(oldPassword, userExist.password)) {
        await userService.update(userId, {
          password: encryptPassword(newPassword),
        });
      } else {
        new ValidationError("Old password is incorrect", true);
      }
    } else {
      new ValidationError("Old password is required", true);
    }
  }

  public async sendVerificationEmail(email: string) {
    const userService = ServiceFactory.getInstance("User");
    const tokenService = ServiceFactory.getInstance("Token");
    const emailService = new Message.EmailService();
    const userExist = await userService.getByEmail(email);

    if (userExist) {
      const { code } = await tokenService.create({
        userId: userExist.id,
        code: generateCode(),
        expireAt: generateExpiredAt(1, "hour"),
        type: "verify_email",
      });

      emailService.send({
        to: userExist.email,
        subject: "Reset Password",
        message: `http://localhost:${process.env.PORT || 5000}/auth/verify-email/${code}`,
        html: `<a href="http://localhost:${process.env.PORT || 5000}/auth/verify-email/${code}">Verify Email</a>`,
        from: process.env.NODEMAILER_EMAIL,
      });
    }

    return;
  }

  public async verifyEmail(code: string) {
    const tokenService = ServiceFactory.getInstance("Token");
    const userService = ServiceFactory.getInstance("User");

    const codeExist = await tokenService.getByCode(code, "verify_email");

    if (codeExist) {
      return await userService.update(codeExist.userId, {
        isVerified: true,
      });
    } else {
      throw new ValidationError("Invalid code", true);
    }
  }

  public async resendEmailVerification() {
    // TODO
    // implement resend email verification
  }
}
