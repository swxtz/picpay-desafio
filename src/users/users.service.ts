import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dtos";
import { ArgonService } from "src/argon/argon/argon.service";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private argon: ArgonService,
    ) {}

    async create(data: CreateUserDto) {
        const hashedPassword = await this.argon.hash(data.password);

        await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                Document: {
                    create: {
                        number: Number(data.document),
                        type: data.type,
                    },
                },
            },
        });
        return data;
    }
}
