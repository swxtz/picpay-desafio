import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dtos";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const document = Number(data.document);

        await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
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
