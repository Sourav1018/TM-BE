import { HttpError } from "@/shared/http/http-error";
import { CreatePackageInput } from "@/modules/packages/packages.validation";
import { PackagesRepositoryPort } from "@/modules/packages/packages.repository.port";

export class PackagesUseCase {
  constructor(private readonly packagesRepository: PackagesRepositoryPort) {}

  async createPackage(input: CreatePackageInput) {
    if (input.comparePrice < input.price) {
      throw new HttpError(
        "comparePrice must be greater than or equal to price.",
        400,
        "INVALID_PRICE_RANGE",
      );
    }

    const place = await this.packagesRepository.findPlaceById(input.placeId);
    if (!place) {
      throw new HttpError("placeId does not exist.", 404, "PLACE_NOT_FOUND");
    }

    const existingPackage = await this.packagesRepository.findPackageBySlug(input.slug);
    if (existingPackage) {
      throw new HttpError("slug already exists.", 409, "SLUG_ALREADY_EXISTS");
    }

    return this.packagesRepository.createPackage(input);
  }
}
