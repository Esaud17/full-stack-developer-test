import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private authService: AuthService) {
        super(
            { header: 'HTTP-X-API-KEY', prefix: '' },true,
            async (apikey, done, req) => {
             return this.validate(apikey, done);
          });
    }
    public async validate(apiKey: string, done: (error: Error, data) => {}) {
        const check = await this.authService.validateApiKey(apiKey);
        if (!check) {
          return done( new UnauthorizedException(), null);
          //throw new UnauthorizedException();
        }
        return done(null, apiKey);
    }

}