import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";
import * as jwt from "jsonwebtoken";

export const generateToken = (value: Record<string, any>) => {
  return jwt.sign(value, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as { session: string; data: Record<string, any> };
};

export const encryptPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export const comparePassword = (password: string, storedPassword: string) => {
  const [salt, hash] = storedPassword.split(":");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return hashedPassword === hash;
};

export const encryptData = (data: any) => {
  const cipher = createCipheriv("aes-256-cbc", process.env.ENC_KEY, process.env.ENC_IV);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptData = (hash: string) => {
  const decipher = createDecipheriv("aes-256-cbc", process.env.ENC_KEY, process.env.ENC_IV);
  let decrypted = decipher.update(hash, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};
