import type { CreatePackageInput } from "@/modules/packages/validation";
import { CreatePackageUseCase } from "@/modules/packages/usecases/create-package.usecase";

export class PackagesFacade {
  constructor(private readonly createPackageUseCase: CreatePackageUseCase) {}

  async createPackage(input: CreatePackageInput) {
    return this.createPackageUseCase.execute(input);
  }
}
