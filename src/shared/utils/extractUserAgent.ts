import { Request } from "express";

export function extractUserAgent(req: Request) {
  return (
    req.get("User-Agent") ||
    req.headers["user-agent"]?.toString() ||
    ""
  );
}
