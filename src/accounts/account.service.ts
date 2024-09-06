import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAccount } from "src/entities/user-account";
import { compareSync as bcryptCompareSync } from "bcryptjs";

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaClient) {}

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
      return await this.prisma.user.findUnique({
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

  public async deleteAccount(email: string): Promise<void> {
    try {
      const verifyUser = await this.getAccountByEmail(email);
      if (verifyUser) {
        await this.prisma.user.delete({ where: { email } });
        return;
      }
      throw new NotFoundException();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updatePassword(
    email: string,
    oldpassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const verifyAccount = await this.getAccountByEmail(email);
      if (
        verifyAccount &&
        bcryptCompareSync(oldpassword, verifyAccount?.password)
      ) {
        const hashedPassword = await hash(newPassword, 8);
        this.prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        });
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
