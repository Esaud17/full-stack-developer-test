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

 
  async registroSalida(
    empleado: Empleado,
    createDto: Placa,
  ): Promise<RegistroEstacionamiento> {
    let CrearRegistro = false;
    let salida = new Date();

    let auto = await this.vehiculoService.findByPlaca(createDto.placa);
    const bitacoraEntrada = await this.bitacoraService.get(auto.bitacora);
    let minutos = moment.duration(
      moment(salida).diff(moment(bitacoraEntrada.fecha.toISOString())),
    );
    let importe = 0;
    let tiempoEstadia = 0;

    if (auto.tipo === TipoVehiculotoEnum.Residente) {
      const registros = await this.registroService.findByPlaca(auto.placa);
      let tiempo = registros.tiempo + minutos.asMinutes();
      importe = tiempo * RESIDENTES;

      let registro = new Registro({
        vehiculo: auto.placa,
        status: true,
        tiempo: tiempo,
        importe: importe,
      });
      this.registroService.update(registros._id, registro);
      tiempoEstadia = minutos.asMinutes();
    } else if (auto.tipo === TipoVehiculotoEnum.NoResidente) {
      importe = minutos.asMinutes() * NORESIDENTES;
      tiempoEstadia = minutos.asMinutes();
    }

    if (auto.accion === TipoMovimientoEnum.Entrada) {
      CrearRegistro = true;
      const bitacoraSalida = await this.bitacoraService.create(
        new Bitacora({
          vehiculo: auto._id,
          tipo_movimiento: TipoMovimientoEnum.Salida,
          empleado: empleado.id,
          fecha: salida,
        }),
      );

      let datos = new Vehiculo({
        placa: auto.placa,
        accion: TipoMovimientoEnum.Salida,
        bitacora: null,
      });
      auto = await this.vehiculoService.update(auto._id, datos);

      return new RegistroEstacionamiento({
        placa: bitacoraSalida.vehiculo,
        entrada: bitacoraSalida.fecha.toISOString(),
        accion: bitacoraSalida.tipo_movimiento,
        importe: importe,
        tiempo: tiempoEstadia,
      });
    }
    return null;
  }
}
