import { Router } from "express";
import { getContentMediaModuleStatus } from "@/modules/content-media/content-media.controller";

export const contentMediaRouter = Router();

contentMediaRouter.get("/", getContentMediaModuleStatus);
