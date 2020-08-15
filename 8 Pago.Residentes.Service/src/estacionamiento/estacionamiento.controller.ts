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

  @ApiBody({ type: FilePdf })
  @ApiResponse({
    status: 200,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/pagos-residentes')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async pagoResidentes(
    @Req() req,
    @Res() res,
    @Body() createDto: FilePdf,
  ): Promise<any> {
    try {
      const registros = await this.estacionamientoService.pagosResidentes(
        createDto,
      );
      return res.status(HttpStatus.OK).json(registros);
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }


}


