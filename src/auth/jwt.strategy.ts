import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env";
import { tokenSchema, TokenSchema } from "src/types/account.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<Env, true>) {
    const key = configService.get<string>("JWT_PRIVATE_KEY");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: key,
      algorithms: ["RS256"],
    });
  }

  public validate(payload: TokenSchema) {
    console.log("Payload validado:", payload);
    return tokenSchema.parse(payload);
  }
}
