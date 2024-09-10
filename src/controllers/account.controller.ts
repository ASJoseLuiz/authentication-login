import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UsePipes,
} from "@nestjs/common";
import { getAccountByEmail, GetAccountByEmail } from "../types/zod.types";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import { AccountsService } from "src/accounts/account.service";
import { UserAccount } from "src/entities/user-account";

@Controller("/home/accounts")
export class AccountController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  public async handleGetAccounts(): Promise<UserAccount[]> {
    return await this.accountService.getAccounts();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(getAccountByEmail))
  public async handleGetAccountByEmail(
    @Body() body: GetAccountByEmail
  ): Promise<UserAccount> {
    const { email } = body;
    const user = await this.accountService.getAccountByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
