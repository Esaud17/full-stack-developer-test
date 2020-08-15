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

  async comienzaMes() {
    const bitacora = await this.bitacoraService.remove();
    const registros = await this.registroService.remove();
    return true;
  }
}
