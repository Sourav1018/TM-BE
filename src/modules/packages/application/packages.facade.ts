import type { CreatePackageInput, UpdatePackageInput } from "@/modules/packages/validation";
import type { CreatePackageUseCase } from "@/modules/packages/usecases/create-package.usecase";
import type { UpdatePackageUseCase } from "@/modules/packages/usecases/update-package.usecase";

export class PackagesFacade {
  constructor(
    private readonly createPackageUseCase: CreatePackageUseCase,
    private readonly updatePackageUseCase: UpdatePackageUseCase,
  ) {}

  async createPackage(input: CreatePackageInput) {
    return this.createPackageUseCase.execute(input);
  }

  async updatePackage(packageId: string, input: UpdatePackageInput) {
    return this.updatePackageUseCase.execute(packageId, input);
  }
}
