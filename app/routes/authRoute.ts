import { Router } from "express";
import AuthController from "../controllers/Auth";
import { AuthMiddleware } from "../middlewares/authentication";
import { validateRequest } from "../utlis/validateRequest";
import { ChangePasswordRequest, ForgotPasswordRequest, LoginRequest, ResetPasswordRequest } from "../models/Auth";

const authRoute = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
authRoute.post("/login", validateRequest(LoginRequest), authController.login.bind(authController));
authRoute.post("/register", authController.register.bind(authController));
authRoute.delete(
  "/logout",
  authMiddleware.authenticate.bind(authMiddleware),
  authController.logout.bind(authController)
);
authRoute.post(
  "/token",
  authMiddleware.authenticate.bind(authMiddleware),
  authController.refreshToken.bind(authController)
);
authRoute.post(
  "/forget-password",
  validateRequest(ForgotPasswordRequest),
  authController.forgetPassword.bind(authController)
);

authRoute.post(
  "/reset-password/:code",
  validateRequest(ResetPasswordRequest),
  authController.resetPassword.bind(authController)
);

authRoute.put(
  "/change-password",
  authMiddleware.authenticate.bind(authMiddleware),
  validateRequest(ChangePasswordRequest),
  authController.changePassword.bind(authController)
);

authRoute.post("/verify-email/:code", authController.verifyEmail.bind(authController));

export default authRoute;
