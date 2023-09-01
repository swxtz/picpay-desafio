import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    document: z.string().min(11).max(14),
    type: z.enum(["CPF", "CNPJ"]),
});

export class CreateUserDto extends createZodDto(schema) {}
