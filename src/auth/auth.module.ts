import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env';
import { PassportModule } from '@nestjs/passport';
import { AuthenticateController } from 'src/controllers/authenticate.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService<Env, true>) => ({
        privateKey: configService.get<string>('JWT_PRIVATE_KEY'),
        publicKey: configService.get<string>('JWT_PUBLIC_KEY'),
        signOptions: { algorithm: 'RS256' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [AuthenticateController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
