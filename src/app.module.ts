import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { ArgonModule } from "./argon/argon.module";

@Module({
    imports: [PrismaModule, UsersModule, ArgonModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
