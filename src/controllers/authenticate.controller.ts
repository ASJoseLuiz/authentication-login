import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthDTO } from "src/auth/auth.dto";
import { AuthService } from "src/auth/auth.service";
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";
import { SignInBodySchema, signInBodySchema } from "src/types/user.types";

@Controller('/sessions')
export class AuthenticateController {
    constructor(private authService: AuthService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(signInBodySchema))
    async handle(@Body() body: SignInBodySchema): Promise<AuthDTO> {
        const { email, password } = body
        return this.authService.signIn(email, password)
    }
}