import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends
   PassportStrategy(Strategy,"jwt") {
   constructor(config: ConfigService) {
      super({
         jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: config.get("SECRET_KEY"),
         algorithm: "HS256"
      });
   }
   async validate(token: any) {
      return token;
   }


}