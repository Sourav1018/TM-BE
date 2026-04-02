import { Request, Response } from "express";
import { getHealthPayload } from "@/modules/health/health.service";

export function getHealth(_req: Request, res: Response) {
  res.status(200).json(getHealthPayload());
}
