import {
    HttpException,
    Injectable,
    UseInterceptors,
    Inject,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dtos";
import { ArgonService } from "src/argon/argon/argon.service";
import {
    CACHE_MANAGER,
    CacheInterceptor,
    CacheTTL,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private argon: ArgonService,
        @Inject(CACHE_MANAGER) private cache: Cache,
    ) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    async create(data: CreateUserDto) {
        const cachedData = await this.cache.get(data.email);

        if (cachedData) {
            console.log("cachedData", cachedData);
            throw new HttpException("Email already exists", 400);
        }

        const verifyEmail = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        const hashedPassword = await this.argon.hash(data.password);

        if (verifyEmail) {
            console.log("aqui");
            await this.cache.set(data.email, data.email);
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
