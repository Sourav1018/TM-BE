import { ERROR_CATALOG } from "@/shared/errors/error-catalog";
import { ErrorCode } from "@/shared/errors/error-codes";

type AppErrorOptions = {
  message?: string;
  details?: unknown;
};

export class AppError extends Error {
  code: ErrorCode;
  statusCode: number;
  details?: unknown;

  constructor(code: ErrorCode, options?: AppErrorOptions) {
    const catalogEntry = ERROR_CATALOG[code];
    super(options?.message ?? catalogEntry.defaultMessage);
    this.name = "AppError";
    this.code = code;
    this.statusCode = catalogEntry.statusCode;
    this.details = options?.details;
  }
}
