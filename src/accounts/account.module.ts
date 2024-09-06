import { Module } from "@nestjs/common";
import { AccountsService } from "./account.service";

@Module({
  providers: [AccountsService],
})
export class AccountsModule {}
