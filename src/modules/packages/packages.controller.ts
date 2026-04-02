import { Request, Response } from "express";
import { HttpError } from "@/shared/http/http-error";
import { PackagesUseCase } from "@/modules/packages/packages.usecase";
import { PackagesValidation } from "@/modules/packages/packages.validation";

export class PackagesController {
  constructor(private readonly packagesUseCase: PackagesUseCase) {}

  getPackagesModuleStatus = (_req: Request, res: Response) => {
    res.status(200).json({
      module: "packages",
      status: "ready",
      message: "Packages module route group is ready for CRUD endpoints.",
    });
  };

  createPackage = async (req: Request, res: Response) => {
    try {
      const input = PackagesValidation.validateCreatePackageInput(req.body);
      const createdPackage = await this.packagesUseCase.createPackage(input);

      res.status(201).json({ data: createdPackage });
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        });
        return;
      }

      console.error("Unexpected error while creating package:", error);
      res.status(500).json({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating package.",
        },
      });
    }
  };
}
