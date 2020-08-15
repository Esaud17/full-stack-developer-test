import { v4 as uuidv4 } from 'uuid';
import { Empleado } from './../../empleados/dto/empleado.dto';
import { AccessToken } from './../dto/access-token.dto';
import { IEmpleado } from './../../empleados/interfaces/empleado.interface';
import { Injectable } from '@nestjs/common';
import { EmpleadosService } from '../../empleados/services/empleados.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private empleadoService: EmpleadosService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<IEmpleado> {
    const empleado = await this.empleadoService.findByEmail(email);
    let compare: string;
    try {
      compare = empleado.password;
    } catch (error) {
      compare = '';
    }
    const statePassword = await this.empleadoService.VerifyPassword(
      password,
      compare,
    );
    if (empleado && statePassword) {
      return empleado;
    }
    return null;
  }

  async generateToken(user: Empleado): Promise<AccessToken> {
    const payload = { jwtid: uuidv4(), username: user.usuario, sub: user.id };
    return new AccessToken({
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateApiKey(key: string): Promise<boolean> {
    return key === process.env.API_KEY;
  }
}
