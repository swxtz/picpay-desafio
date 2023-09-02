import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
    id: z.string().uuid(),
});

export class DeleteUserDto extends createZodDto(schema) {}
