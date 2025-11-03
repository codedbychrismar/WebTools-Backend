import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { db } from "../db/index";
import { users, userSessions } from "../db/schema/index";
import { eq } from "drizzle-orm";

// -----------------------------
// Helper to safely get JWT secret
// -----------------------------
function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return process.env.JWT_SECRET;
}

// -----------------------------
// Token Generators
// -----------------------------
export function createAccessToken(userId: string): string {
  const secret = getJwtSecret();
  return jwt.sign({ userId }, secret, { expiresIn: "15m" });
}

export function createRefreshToken(): string {
  return crypto.randomUUID();
}

// -----------------------------
// Sign Up Service
// -----------------------------
export async function signUpServices(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({ username, password: hashedPassword })
    .returning();

  if (!newUser) throw new Error("Failed to create user");

  return newUser;
}

// -----------------------------
// Sign In Service
// -----------------------------
export async function signInServices(username: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.username, username));
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const accessToken = createAccessToken(user.user_id.toString());
  const refreshToken = createRefreshToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.insert(userSessions).values({
    userId: user.user_id, // No need for parseInt if user_id is already number or UUID string
    refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken, user };
}


// -----------------------------
// Refresh Access Token Service
// -----------------------------
export async function refreshAccessTokenService(refreshToken: string) {
  const [session] = await db.select().from(userSessions).where(eq(userSessions.refreshToken, refreshToken));

  if (!session || new Date(session.expiresAt) < new Date()) {
    throw new Error("Invalid or expired refresh token");
  }

  const newAccessToken = createAccessToken(session.userId.toString());
  const newRefreshToken = createRefreshToken();
  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.update(userSessions)
    .set({
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt,
    })
    .where(eq(userSessions.id, session.id));

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

// -----------------------------
// Sign Out Service
// -----------------------------
export async function signOutService(refreshToken: string) {
  await db.delete(userSessions).where(eq(userSessions.refreshToken, refreshToken));
}
