import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env), // Função para validar variáveis ambientes
    isGlobal: true // Permite utilizar as variáveis ambientes em qualquer módulo
  }), AuthModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [PrismaService, JwtService, AuthService],
})
export class AppModule {}
