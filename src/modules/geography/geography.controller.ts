import type { Request, Response } from "express";
import { getGeographyModulePayload } from "@/modules/geography/geography.service";

export function getGeographyModuleStatus(_req: Request, res: Response) {
  res.status(200).json(getGeographyModulePayload());
}
