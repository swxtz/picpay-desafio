import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/users/dtos/create-user.dtos";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(CreateUserDto))
    async create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }
}
