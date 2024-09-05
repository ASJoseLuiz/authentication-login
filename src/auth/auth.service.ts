import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

    async signIn(email: string, password: string): Promise<AuthDTO>{
        const user = await this.prisma.user.findUnique({where: {email}})
        if (!user || !bcryptCompareSync(password, user?.password)) throw new UnauthorizedException()
        
        const payload = { sub: user.id, name: user.name }
        const token = this.jwt.sign(payload, { algorithm: 'RS256' });
        return {token}
    }
}
