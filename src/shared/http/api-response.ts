import type { Response } from "express";

type ErrorResponseShape = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
};

export class ApiResponse {
  static success<T>(res: Response, statusCode: number, data: T) {
    return res.status(statusCode).json({ data });
  }

  static error(res: Response, error: ErrorResponseShape) {
    return res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }
}
