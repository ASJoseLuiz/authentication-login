import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AccountsService } from "src/accounts/account.service";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import {
  CreateAccountBodySchema,
  createAccountBodySchema,
} from "src/types/account.types";

@Controller("/home/create-account")
export class CreateAccountController {
  constructor(private readonly accountService: AccountsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  public async handlePost(
    @Body() body: CreateAccountBodySchema
  ): Promise<void> {
    const { name, email, password } = body; //
    await this.accountService.saveAccount(name, email, password);
  }
}
