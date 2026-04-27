import type { Request, Response } from "express";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ApiResponse } from "@/shared/http/api-response";
import { HTTP_STATUS } from "@/shared/http/http-status";
import { ItinerariesFacade } from "@/modules/itineraries/application/itineraries.facade";
import {
  CreateItineraryValidation,
  ItinerariesValidation,
  UpdateItineraryValidation,
} from "@/modules/itineraries/validation";

export class ItinerariesController {
  constructor(private readonly itinerariesFacade: ItinerariesFacade) { }

  getItinerariesModuleStatus = (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      module: "itineraries",
      status: "ready",
      message: "Itineraries module route group is ready for CRUD endpoints.",
    });
  };

  createItinerary = async (req: Request, res: Response) => {
    try {
      const input = CreateItineraryValidation.parse(req.body);
      const created = await this.itinerariesFacade.createItinerary(input);

      return ApiResponse.success(res, HTTP_STATUS.CREATED, created);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError ? error : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      return ApiResponse.error(res, appError);
    }
  };

  updateItinerary = async (req: Request, res: Response) => {
    try {
      const { id } = ItinerariesValidation.validateIdParam(req.params);
      const input = UpdateItineraryValidation.parseBody(req.body);
      const updated = await this.itinerariesFacade.updateItinerary(id, input);

      return ApiResponse.success(res, HTTP_STATUS.OK, updated);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError ? error : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      return ApiResponse.error(res, appError);
    }
  };

  deleteItinerary = async (req: Request, res: Response) => {
    try {
      const { id } = ItinerariesValidation.validateIdParam(req.params);
      await this.itinerariesFacade.deleteItinerary(id);

      return ApiResponse.noContent(res);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError ? error : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      return ApiResponse.error(res, appError);
    }
  };

  getPackageItineraries = async (req: Request, res: Response) => {
    try {
      const { packageId } = ItinerariesValidation.validatePackageIdParam(req.params);
      const itineraries = await this.itinerariesFacade.getPackageItineraries(packageId);

      return ApiResponse.success(res, HTTP_STATUS.OK, itineraries);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError ? error : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      return ApiResponse.error(res, appError);
    }
  };
}
