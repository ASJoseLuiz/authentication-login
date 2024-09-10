import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthenticateController } from "src/controllers/authenticate.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [PassportModule, JwtModule, PrismaModule],
  controllers: [AuthenticateController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
