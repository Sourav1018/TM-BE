import type { Request, Response } from "express";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ApiResponse } from "@/shared/http/api-response";
import { HTTP_STATUS } from "@/shared/http/http-status";
import { PlacesFacade } from "@/modules/places/application/places.facade";
import { PlacesValidation } from "@/modules/places/validation/places.validation";

export class PlacesController {
  constructor(private readonly placesFacade: PlacesFacade) {}

  getPlacesModuleStatus = (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      module: "places",
      status: "ready",
      message: "Places module route group is ready for CRUD endpoints.",
    });
  };

  createPlace = async (req: Request, res: Response) => {
    try {
      const input = PlacesValidation.validateCreatePlaceInput(req.body);
      const createdPlace = await this.placesFacade.createPlace(input);

      return ApiResponse.success(res, HTTP_STATUS.CREATED, createdPlace);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      if (!(error instanceof AppError)) {
        console.error("Unexpected error while creating place:", error);
      }

      return ApiResponse.error(res, appError);
    }
  };

  updatePlace = async (req: Request, res: Response) => {
    try {
      const { id } = PlacesValidation.validateUpdatePlaceParams(req.params);
      const input = PlacesValidation.validateUpdatePlaceInput(req.body);
      const updatedPlace = await this.placesFacade.updatePlace(id, input);

      return ApiResponse.success(res, HTTP_STATUS.OK, updatedPlace);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      if (!(error instanceof AppError)) {
        console.error("Unexpected error while updating place:", error);
      }

      return ApiResponse.error(res, appError);
    }
  };
}
