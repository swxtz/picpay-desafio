import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma/prisma.service";
import { CreateTransactionDto } from "./dtos/create-transaction-dtos";

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateTransactionDto) {
        
    }
}
