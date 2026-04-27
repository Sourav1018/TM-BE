import type { CreatePlaceInput, UpdatePlaceInput } from "@/modules/places/validation";
import type { CreatePlaceUseCase } from "@/modules/places/usecases/create-place.usecase";
import type { UpdatePlaceUseCase } from "@/modules/places/usecases/update-place.usecase";

export class PlacesFacade {
  constructor(
    private readonly createPlaceUseCase: CreatePlaceUseCase,
    private readonly updatePlaceUseCase: UpdatePlaceUseCase,
  ) {}

  async createPlace(input: CreatePlaceInput) {
    return this.createPlaceUseCase.execute(input);
  }

  async updatePlace(placeId: string, input: UpdatePlaceInput) {
    return this.updatePlaceUseCase.execute(placeId, input);
  }
}
