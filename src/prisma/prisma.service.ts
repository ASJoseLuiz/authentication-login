import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor() {
        super({
            log: ['error']
        })
    }

    public async onModuleInit() {
        return this.$connect()
    }
    public async onModuleDestroy() {
        return this.$disconnect()
    }
}
