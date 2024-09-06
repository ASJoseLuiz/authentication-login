import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import {
  createAccountBodySchema,
  CreateAccountBodySchema,
  getAccountByEmail,
  GetAccountByEmail,
  UpdatePasswordByEmail,
  updatePasswordByEmail,
} from "../types/account.types";
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

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // validação do body
  public async handlePost(
    @Body() body: CreateAccountBodySchema
  ): Promise<void> {
    const { name, email, password } = body; //
    await this.accountService.saveAccount(name, email, password);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(getAccountByEmail))
  public async handleGetAccountByEmail(
    @Body() body: GetAccountByEmail
  ): Promise<UserAccount> {
    const { email } = body;
    return await this.handleGetAccountByEmail({ email });
  }

  @Delete()
  @UsePipes(new ZodValidationPipe(getAccountByEmail))
  public async handleDeleteAccountByEmail(
    @Body() body: GetAccountByEmail
  ): Promise<void> {
    const { email } = body;
    await this.accountService.deleteAccount(email);
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(updatePasswordByEmail))
  public async handleUpdatePasswordByEmail(
    @Body() body: UpdatePasswordByEmail
  ): Promise<void> {
    const { email, oldPassword, newPassword } = body;
    await this.accountService.updatePassword(email, oldPassword, newPassword);
  }
}
