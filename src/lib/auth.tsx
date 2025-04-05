// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: number;
  email: string;
  profileUrl: string;
  exp: number;
}

export async function getUserFromCookie(): Promise<{
  accessToken: string;
  user: JwtPayload;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return { accessToken: token, user: decoded };
  } catch {
    return null;
  }
}
