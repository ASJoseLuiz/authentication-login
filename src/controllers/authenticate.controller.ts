import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { TOKEN } from "src/auth/token.dto";
import { AuthService } from "src/auth/auth.service";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import { SignInBodySchema, signInBodySchema } from "src/types/account.types";

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(signInBodySchema))
  async handle(@Body() body: SignInBodySchema): Promise<TOKEN> {
    const { email, password } = body;
    return this.authService.validation(email, password);
  }
}
