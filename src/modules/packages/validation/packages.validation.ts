import { CreatePackageValidation } from "@/modules/packages/validation";
import type { CreatePackageInput } from "@/modules/packages/validation";
import { UpdatePackageValidation } from "@/modules/packages/validation";
import type { UpdatePackageInput, UpdatePackageParams } from "@/modules/packages/validation";

export class PackagesValidation {
  static validateCreatePackageInput(payload: unknown): CreatePackageInput {
    return CreatePackageValidation.parse(payload);
  }

  static validateUpdatePackageInput(payload: unknown): UpdatePackageInput {
    return UpdatePackageValidation.parseBody(payload);
  }

  static validateUpdatePackageParams(payload: unknown): UpdatePackageParams {
    return UpdatePackageValidation.parseParams(payload);
  }
}
