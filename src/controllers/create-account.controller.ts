import { Body, ConflictException, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { User } from "src/entities/user";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs";
import { createAccountBodySchema, CreateAccountBodySchema } from "../types/user.types"
import { ZodValidationPipe } from "src/pipes/zod.validation.pipe";

@Controller('/accounts')
export class CreateAccountController {
    
    constructor(private prisma: PrismaService) {}

    @Get()
    async handleGetAccounts() {
        return await this.prisma.user.findMany()
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // validação do body
    async handlePost(@Body() body: CreateAccountBodySchema) {
        
        const { name, email, password } = body // 
        const userEmail: User | null = await this.prisma.user.findUnique({where: {email}})
        
        if (!userEmail){
            const hashedPassword = await hash(password, 8)
            
            await this.prisma.user.create({data: {
                name,
                email,
                password: hashedPassword
            }})
            return
        }
        
        throw new ConflictException('Email já cadastrado')
        
        
    }
}
