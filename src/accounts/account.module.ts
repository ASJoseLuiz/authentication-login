import { Module } from "@nestjs/common";
import { AccountsService } from "./account.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [AccountsService, PrismaService],
})
export class AccountsModule {}
