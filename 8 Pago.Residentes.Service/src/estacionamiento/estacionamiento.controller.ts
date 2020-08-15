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
  @Post('/registra-salida')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async salida(
    @Req() req,
    @Res() res,
    @Body() createDto: Placa,
  ): Promise<RegistroEstacionamiento> {
    try {
      const resultado = await this.estacionamientoService.registroSalida(
        req.user,
        createDto,
      );
      return resultado !== undefined
        ? res.status(HttpStatus.OK).json(resultado)
        : res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }

  @ApiBody({ type: Placa })
  @ApiResponse({
    status: 200,
    type: Vehiculo,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/alta-vehiculo-oficial')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async altaOfical(
    @Req() req,
    @Res() res,
    @Body() createDto: Placa,
  ): Promise<Vehiculo> {
    try {
      const auto = await this.estacionamientoService.altaVehiculoOficial(
        createDto,
      );
      return res.status(HttpStatus.OK).json(auto);
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }

  @ApiBody({ type: Placa })
  @ApiResponse({
    status: 200,
    type: Vehiculo,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/alta-vehiculo-residente')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async altaResidente(
    @Req() req,
    @Res() res,
    @Body() createDto: Placa,
  ): Promise<Vehiculo> {
    try {
      const auto = await this.estacionamientoService.altaVehiculoResidente(
        createDto,
      );
      return res.status(HttpStatus.OK).json(auto);
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }

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

  @ApiBody({  })
  @ApiResponse({
    status: 200,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 403, description: 'El registro no pudo ser creado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/comienza-mes')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async comienzaMes(
    @Req() req,
    @Res() res,
    @Body() createDto: FilePdf,
  ): Promise<any> {
    try {
      const registros = await this.estacionamientoService.comienzaMes();
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN);
    }
  }
}


