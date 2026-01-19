// Auth Library
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Server-side auth utilities (keeping the original name for backward compatibility)
export const authUtils = {
  // Password hashing
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  },

  // Password verification
  verifyPassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },

  // JWT token generation
  generateToken: (payload: Omit<JWTPayload, "iat" | "exp">): string => {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  },

  // JWT token verification
  verifyToken: (token: string): JWTPayload | null => {
    try {
      const decoded = jwt.decode(token) as JWTPayload;
      console.log("Decoded token:", decoded);
      console.log("Expires at:", new Date(decoded.exp * 1000));
      console.log("Current time:", new Date());

      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },

  // Generate OTP (6-digit random number)
  generateOTP: (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Generate secure random string
  generateSecureToken: (length: number = 32): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};
