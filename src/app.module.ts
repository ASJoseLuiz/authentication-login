import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { AccountController } from "./controllers/account.controller";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth/auth.service";
import { AccountsModule } from "./accounts/account.module";
import { AccountsService } from "./accounts/account.service";
import { UserConfigController } from "./controllers/user-config.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { HomePageController } from "./controllers/home-page.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // Função para validar variáveis ambientes
      isGlobal: true, // Permite utilizar as variáveis ambientes em qualquer módulo
    }),
    AuthModule,
    AccountsModule,
  ],
  controllers: [
    AccountController,
    AuthenticateController,
    UserConfigController,
    CreateAccountController,
    HomePageController,
  ],
  providers: [PrismaService, JwtService, AuthService, AccountsService],
})
export class AppModule {}
