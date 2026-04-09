import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { SeedError } from "@/seeders/shared/seed-error";

export type ParsedSeedRow<T> = {
  rowNumber: number;
  value: T;
};

function validateHeaders(
  actualHeaders: string[],
  expectedHeaders: readonly string[],
  fileName: string,
) {
  const expected = new Set(expectedHeaders);
  const actual = new Set(actualHeaders);

  const missing = expectedHeaders.filter((header) => !actual.has(header));
  const unexpected = actualHeaders.filter((header) => !expected.has(header));

  if (missing.length > 0 || unexpected.length > 0) {
    throw new SeedError("Invalid CSV headers.", {
      file: fileName,
      details: { missing, unexpected },
    });
  }
}

export class CsvReader {
  constructor(private readonly baseDirectory: string) {}

  readRows<T>(
    fileName: string,
    expectedHeaders: readonly string[],
    parseRow: (record: Record<string, string>, rowNumber: number) => T,
  ): ParsedSeedRow<T>[] {
    const filePath = path.join(this.baseDirectory, fileName);
    if (!fs.existsSync(filePath)) {
      throw new SeedError("CSV file not found.", { file: fileName });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    let validatedHeaders = false;
    const rawRecords = parse(fileContent, {
      columns: (headers: string[]) => {
        validateHeaders(headers, expectedHeaders, fileName);
        validatedHeaders = true;
        return headers;
      },
      bom: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: false,
    }) as Record<string, string>[];

    if (!validatedHeaders) {
      throw new SeedError("CSV header row is missing.", { file: fileName });
    }

    return rawRecords.map((record, index) => {
      const rowNumber = index + 2;
      return {
        rowNumber,
        value: parseRow(record, rowNumber),
      };
    });
  }
}
