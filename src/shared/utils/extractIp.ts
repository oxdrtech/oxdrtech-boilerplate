import { Request } from "express";

export function extractIp(req: Request) {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    req.ip ||
    ""
  );
}
