import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    value: z.number().positive(),
    payye: z.number().positive(),
    payer: z.number().positive(),
});

export class CreateTransactionDto extends createZodDto(schema) {}
