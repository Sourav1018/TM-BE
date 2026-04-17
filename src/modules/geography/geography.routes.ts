import { Router } from "express";
import { getGeographyModuleStatus } from "@/modules/geography/geography.controller";

export const geographyRouter = Router();

geographyRouter.get("/", getGeographyModuleStatus);
