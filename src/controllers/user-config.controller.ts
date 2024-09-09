import { Body, Controller, Delete, Patch, UsePipes } from "@nestjs/common";
import { AccountsService } from "src/accounts/account.service";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import {
  deleteAccountByEmail,
  DeleteAccountByEmail,
  UpdatePasswordByEmail,
  updatePasswordByEmail,
} from "src/types/account.types";

@Controller("/user/config")
export class UserConfigController {
  constructor(private readonly accountService: AccountsService) {}

  @Delete()
  @UsePipes(new ZodValidationPipe(deleteAccountByEmail))
  public async handleDeleteAccountByEmail(
    @Body() body: DeleteAccountByEmail
  ): Promise<void> {
    const { email, password } = body;
    await this.accountService.deleteAccount(email, password);
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
