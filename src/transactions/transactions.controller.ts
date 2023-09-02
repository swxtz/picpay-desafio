import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dtos/create-transaction-dtos";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(CreateTransactionDto))
    async create(@Body() data: CreateTransactionDto) {
        return await this.transactionsService.create(data);
    }
}
