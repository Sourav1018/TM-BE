import { Request, Response } from "express";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ApiResponse } from "@/shared/http/api-response";
import { HTTP_STATUS } from "@/shared/http/http-status";
import { PackagesUseCase } from "@/modules/packages/packages.usecase";
import { PackagesValidation } from "@/modules/packages/packages.validation";

export class PackagesController {
  constructor(private readonly packagesUseCase: PackagesUseCase) {}

  getPackagesModuleStatus = (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      module: "packages",
      status: "ready",
      message: "Packages module route group is ready for CRUD endpoints.",
    });
  };

  createPackage = async (req: Request, res: Response) => {
    try {
      const input = PackagesValidation.validateCreatePackageInput(req.body);
      const createdPackage = await this.packagesUseCase.createPackage(input);

      return ApiResponse.success(res, HTTP_STATUS.CREATED, createdPackage);
    } catch (error: unknown) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(ERROR_CODES.INTERNAL_SERVER_ERROR);

      if (!(error instanceof AppError)) {
        console.error("Unexpected error while creating package:", error);
      }

      return ApiResponse.error(res, appError);
    }
  };
}
