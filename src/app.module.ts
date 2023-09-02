import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { ArgonModule } from "./argon/argon.module";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        ArgonModule,
        ConfigModule.forRoot(),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_HOST || 6379,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
