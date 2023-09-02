import { HttpException, Injectable } from "@nestjs/common";
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

        const verifyEmail = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (verifyEmail) {
            throw new HttpException("Email already exists", 400);
        }

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
