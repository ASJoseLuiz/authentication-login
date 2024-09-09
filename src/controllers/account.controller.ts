import { Body, Controller, Get, UsePipes } from "@nestjs/common";
import { getAccountByEmail, GetAccountByEmail } from "../types/account.types";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import { AccountsService } from "src/accounts/account.service";
import { UserAccount } from "src/entities/user-account";

@Controller("/accounts")
export class AccountController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  public async handleGetAccounts(): Promise<UserAccount[]> {
    return await this.accountService.getAccounts();
  }

  @Get()
  @UsePipes(new ZodValidationPipe(getAccountByEmail))
  public async handleGetAccountByEmail(
    @Body() body: GetAccountByEmail
  ): Promise<UserAccount> {
    const { email } = body;
    return await this.handleGetAccountByEmail({ email });
  }
}
