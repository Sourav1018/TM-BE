import { CreatePlaceValidation } from "@/modules/places/validation";
import type { CreatePlaceInput } from "@/modules/places/validation";
import { UpdatePlaceValidation } from "@/modules/places/validation";
import type { UpdatePlaceInput, UpdatePlaceParams } from "@/modules/places/validation";

export class PlacesValidation {
  static validateCreatePlaceInput(payload: unknown): CreatePlaceInput {
    return CreatePlaceValidation.parse(payload);
  }

  static validateUpdatePlaceInput(payload: unknown): UpdatePlaceInput {
    return UpdatePlaceValidation.parseBody(payload);
  }

  static validateUpdatePlaceParams(payload: unknown): UpdatePlaceParams {
    return UpdatePlaceValidation.parseParams(payload);
  }
}
