import { ERROR_CODES } from "@/shared/errors/error-codes";
import type { ErrorCode } from "@/shared/errors/error-codes";
import { HTTP_STATUS } from "@/shared/http/http-status";
import type { HttpStatusCode } from "@/shared/http/http-status";

export type ErrorCatalogEntry = {
  statusCode: HttpStatusCode;
  defaultMessage: string;
};

export const ERROR_CATALOG: Record<ErrorCode, ErrorCatalogEntry> = {
  [ERROR_CODES.VALIDATION_ERROR]: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    defaultMessage: "Invalid request payload.",
  },
  [ERROR_CODES.INVALID_PRICE_RANGE]: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    defaultMessage: "comparePrice must be greater than or equal to price.",
  },
  [ERROR_CODES.PLACE_NOT_FOUND]: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    defaultMessage: "one or more placeIds do not exist.",
  },
  [ERROR_CODES.CITY_NOT_FOUND]: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    defaultMessage: "city not found.",
  },
  [ERROR_CODES.PACKAGE_NOT_FOUND]: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    defaultMessage: "package not found.",
  },
  [ERROR_CODES.ITINERARY_NOT_FOUND]: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    defaultMessage: "itinerary not found.",
  },
  [ERROR_CODES.ITINERARY_DAY_ALREADY_EXISTS]: {
    statusCode: HTTP_STATUS.CONFLICT,
    defaultMessage: "itinerary day already exists in this package.",
  },
  [ERROR_CODES.SLUG_ALREADY_EXISTS]: {
    statusCode: HTTP_STATUS.CONFLICT,
    defaultMessage: "slug already exists.",
  },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    defaultMessage: "Something went wrong.",
  },
};
