import { Global, Module } from "@nestjs/common";
import { ArgonService } from "./argon/argon.service";

@Global()
@Module({
    providers: [ArgonService],
    exports: [ArgonService],
})
export class ArgonModule {}
