import { Registro } from './../../registros/dto/registro.dto';
import { RegistroEstacionamiento } from "../dto/registro-estacionamiento.dto";
import { TipoMovimientoEnum } from "./../../bitacoras/enums/tipo-movimiento.enum";
import { Empleado } from "./../../empleados/dto/empleado.dto";
import { BitacorasService } from "./../../bitacoras/services/bitacoras.service";
import { PagosService } from "./../../pagos/services/pagos.service";
import { RegistrosService } from "./../../registros/services/registros.service";
import { TiposVehiculoService } from "./../../tipos-vehiculo/services/tipos-vehiculo.service";
import { VehiculosService } from "./../../vehiculos/services/vehiculos.service";
import { Injectable } from "@nestjs/common";
import { EmpleadosService } from "src/empleados/services/empleados.service";
import { Placa } from "../dto/placa.dto";
import { Bitacora } from "src/bitacoras/dto/bitacora.dto";
import { Vehiculo } from "src/vehiculos/dto/vehiculo.dto";
import { TipoVehiculotoEnum } from "src/tipos-vehiculo/enums/tipo-vehiculo.enum";
import moment from "moment";
import { authorize } from "passport";
import { timeEnd } from 'console';
import { NORESIDENTES, RESIDENTES } from 'src/common/models/tarifas';
import { PDF, InjectPdf } from 'nestjs-pdf';
import { FilePdf } from '../dto/file.dto';

@Injectable()
export class EstacionamientoService {
  constructor(
    private empleadoService: EmpleadosService,
    private vehiculoService: VehiculosService,
    private tipoVehiculoService: TiposVehiculoService,
    private registroService: RegistrosService,
    private pagoService: PagosService,
    private bitacoraService: BitacorasService,
    @InjectPdf() private pdf: PDF,
  ) {}

  async registroEntrada(
    empleado: Empleado,
    createDto: Placa,
  ): Promise<RegistroEstacionamiento> {
    let CrearRegistro = false;
    let auto = await this.vehiculoService.findByPlaca(createDto.placa);

    if (!auto) {
      CrearRegistro = true;
      auto = await this.vehiculoService.create(
        new Vehiculo({
          placa: createDto.placa,
          tipo: TipoVehiculotoEnum.NoResidente,
          accion: TipoMovimientoEnum.Entrada,
        }),
      );
    } else if (auto.accion === TipoMovimientoEnum.Salida) {
      CrearRegistro = true;
    }
    if (CrearRegistro) {
      const bitacora = await this.bitacoraService.create(
        new Bitacora({
          vehiculo: auto._id,
          tipo_movimiento: TipoMovimientoEnum.Entrada,
          empleado: empleado.id,
          fecha: new Date(),
        }),
      );

      let datos = new Vehiculo({
        placa: auto.placa,
        accion: TipoMovimientoEnum.Entrada,
        bitacora: bitacora._id,
      });
      auto = await this.vehiculoService.update(auto._id, datos);

      return new RegistroEstacionamiento({
        placa: bitacora.vehiculo,
        entrada: bitacora.fecha.toISOString(),
        accion: bitacora.tipo_movimiento,
      });
    }
    return null;
  }

}
