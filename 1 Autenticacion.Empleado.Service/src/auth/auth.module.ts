import { EmpleadosModule } from './../empleados/empleados.module';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as openapi from '../../config/openapi.json';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
  imports: [
    EmpleadosModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        audience: process.env.APP_URL,
        issuer: openapi.title,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
