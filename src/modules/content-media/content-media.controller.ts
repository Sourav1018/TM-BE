import type { Request, Response } from "express";
import { getContentMediaModulePayload } from "@/modules/content-media/content-media.service";

export function getContentMediaModuleStatus(_req: Request, res: Response) {
  res.status(200).json(getContentMediaModulePayload());
}
