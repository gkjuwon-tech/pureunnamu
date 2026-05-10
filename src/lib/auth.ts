import crypto from "node:crypto";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "pn_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set or too short. Please configure .env (>=32 chars)."
    );
  }
  return s;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export interface SessionData {
  uid: number;
  username: string;
  iat: number; // issued-at (seconds)
}

/**
 * Builds an opaque session cookie value. Format: base64url(JSON).signature
 * HMAC-signed; if anyone tampers with the JSON the signature won't match.
 */
export function createSession(data: Omit<SessionData, "iat">): {
  value: string;
  maxAge: number;
} {
  const payload: SessionData = { ...data, iat: Math.floor(Date.now() / 1000) };
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  const sig = sign(b64);
  return { value: `${b64}.${sig}`, maxAge: SESSION_MAX_AGE };
}

export function verifySession(token: string | undefined | null): SessionData | null {
  if (!token) return null;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  if (sign(b64) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as SessionData;
    if (typeof data.iat !== "number") return null;
    if (Date.now() / 1000 - data.iat > SESSION_MAX_AGE) return null;
    return data;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(req: NextRequest): SessionData | null {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function getSession(): Promise<SessionData | null> {
  // Server Component / route handler context
  const c = cookies();
  return verifySession(c.get(SESSION_COOKIE)?.value);
}

export async function isAdmin(req?: NextRequest): Promise<boolean> {
  if (req) return !!getSessionFromRequest(req);
  const s = await getSession();
  return !!s;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE;
