import { Controller, Res,  Body, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmpleadosService } from './services/empleados.service';
import { Empleado } from './dto/empleado.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Empleados')
@Controller('api/v1/empleados')
export class EmpleadosController {
  constructor(private empleadosService: EmpleadosService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Empleado })
  @ApiResponse({ status: 200, description: 'Registro creado correctamente' })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @Post('/create')
  async create(
    @Res() res,
    @Body() createdEmpleadoDto: Empleado,
  ): Promise<Empleado> {
    try {
      let empleado = await this.empleadosService.create(createdEmpleadoDto);
      return res.status(HttpStatus.OK).json({ _id: empleado._id });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }
}
