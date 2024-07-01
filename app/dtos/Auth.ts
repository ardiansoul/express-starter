import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class RegisterRequest {
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class ResetPasswordRequest {
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class ChangePasswordRequest {
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

export class RefreshTokenRequest {
  refreshToken: string;
}

export class ForgotPasswordRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LogoutRequest {
  refreshToken: string;
}
