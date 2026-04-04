import { ERROR_CODES, ErrorCode } from "@/shared/errors/error-codes";
import { HTTP_STATUS, HttpStatusCode } from "@/shared/http/http-status";

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
    defaultMessage: "placeId does not exist.",
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
