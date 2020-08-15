import { Vehiculo } from './../vehiculos/dto/vehiculo.dto';
import { Controller, Res,  Body, HttpStatus, Post, UseGuards, Req, Put } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EstacionamientoService } from './services/estacionamiento.service';
import { Placa } from './dto/placa.dto';
import { RegistroEstacionamiento } from './dto/registro-estacionamiento.dto';
import { FilePdf } from './dto/file.dto';
import * as csv from 'fast-csv';

@ApiTags('Estacionamiento')
@Controller('api/v1/estacionamiento')
export class EstacionamientoController {
  constructor(private estacionamientoService: EstacionamientoService) {}

  @ApiBody({ type: Placa })
  @ApiResponse({
    status: 200,
    type: RegistroEstacionamiento,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 204, description: 'El vehiculo esta estacionado' })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/registra-entrada')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async entrada(
    @Req() req,
    @Res() res,
    @Body() createDto: Placa,
  ): Promise<RegistroEstacionamiento> {
    try {
      const resultado = await this.estacionamientoService.registroEntrada(
        req.user,
        createDto,
      );
      return resultado !== undefined && resultado !== null
        ? res.status(HttpStatus.OK).json(resultado)
        : res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }
}


