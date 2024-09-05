import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestException({
          error: fromZodError(err),
          message: "Validation failed",
          statusCode: 400,
        }); // 400 = badRequest
      }
      throw new BadRequestException("Validation failed");
    }
  }
}
