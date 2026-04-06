export type SeedErrorContext = {
  file?: string;
  row?: number;
  column?: string;
  value?: unknown;
  details?: unknown;
  cause?: unknown;
};

export class SeedError extends Error {
  readonly context: SeedErrorContext;

  constructor(message: string, context: SeedErrorContext = {}) {
    super(message);
    this.name = "SeedError";
    this.context = context;
  }

  static format(error: unknown): string {
    if (!(error instanceof SeedError)) {
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }

    const locationParts: string[] = [];
    if (error.context.file) {
      locationParts.push(`file=${error.context.file}`);
    }
    if (typeof error.context.row === "number") {
      locationParts.push(`row=${error.context.row}`);
    }
    if (error.context.column) {
      locationParts.push(`column=${error.context.column}`);
    }

    const location = locationParts.length ? ` [${locationParts.join(", ")}]` : "";
    const value = error.context.value !== undefined
      ? ` value=${JSON.stringify(error.context.value)}`
      : "";
    const details = error.context.details !== undefined
      ? ` details=${JSON.stringify(error.context.details)}`
      : "";

    return `${error.message}${location}${value}${details}`;
  }
}
