import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { UserAccount } from "src/entities/user-account";
import { compareSync as bcryptCompareSync } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  public async saveAccount(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const verifyAccount: UserAccount | null =
        await this.prisma.user.findUnique({
          where: { email },
        });

      if (!verifyAccount) {
        const hashedPassword = await hash(password, 8);

        await this.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        return;
      }

      throw new ConflictException("Email já cadastrado");
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getAccountByEmail(email: string): Promise<UserAccount | null> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getAccounts(): Promise<UserAccount[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteAccount(email: string, password: string): Promise<void> {
    try {
      const verifyUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!verifyUser) {
        throw new NotFoundException("Conta não encontrada");
      }

      const isPasswordValid = bcryptCompareSync(password, verifyUser.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Senha incorreta");
      }

      await this.prisma.user.delete({ where: { email } });
      console.log("Conta deletada com sucesso");
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const verifyAccount = await this.getAccountByEmail(email);

      if (!verifyAccount) {
        throw new NotFoundException("Conta não encontrada");
      }

      const isPasswordValid = bcryptCompareSync(
        oldPassword,
        verifyAccount.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Senha antiga incorreta");
      }

      const hashedPassword = await hash(newPassword, 8);

      await this.prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      console.log("Senha atualizada com sucesso");
    } catch (err) {
      throw new Error("Erro ao atualizar a senha");
    }
  }
}
