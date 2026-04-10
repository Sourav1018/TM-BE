import { CreatePackageValidation } from "@/modules/packages/validation";
import type { CreatePackageInput } from "@/modules/packages/validation";

export class PackagesValidation {
  static validateCreatePackageInput(payload: unknown): CreatePackageInput {
    return CreatePackageValidation.parse(payload);
  }
}
