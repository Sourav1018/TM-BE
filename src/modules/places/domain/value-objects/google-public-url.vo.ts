import type { PlaceCoordinates } from "@/modules/places/domain/value-objects/place-coordinates.vo";

export class GooglePublicUrl {
  private constructor(private readonly _value: string) {}

  static fromCoordinates(coordinates: PlaceCoordinates): GooglePublicUrl {
    const value = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
    return new GooglePublicUrl(value);
  }

  get value(): string {
    return this._value;
  }
}
