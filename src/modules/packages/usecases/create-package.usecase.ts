import type { CreatePackageInput } from "@/modules/packages/validation";
import type { PackagesRepositoryPort } from "@/modules/packages/packages.repository.port";
import { PackagePricingPolicy } from "@/modules/packages/domain/policies/package-pricing.policy";
import { PackagePlacePolicy } from "@/modules/packages/domain/policies/package-place.policy";
import { PackageSlugPolicy } from "@/modules/packages/domain/policies/package-slug.policy";

export class CreatePackageUseCase {
  constructor(private readonly packagesRepository: PackagesRepositoryPort) {}

  async execute(input: CreatePackageInput) {
    PackagePricingPolicy.validateCreate(input.price, input.comparePrice);
    await PackagePlacePolicy.assertExists(this.packagesRepository, input.placeId);
    await PackageSlugPolicy.assertAvailable(this.packagesRepository, input.slug);

    return this.packagesRepository.createPackage(input);
  }
}
