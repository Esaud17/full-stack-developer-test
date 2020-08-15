import { AuthModule } from './../auth/auth.module';
import { BitacorasModule } from './../bitacoras/bitacoras.module';
import { RegistrosModule } from './../registros/registros.module';
import { PagosModule } from './../pagos/pagos.module';
import { TiposVehiculoModule } from './../tipos-vehiculo/tipos-vehiculo.module';
import { VehiculosModule } from './../vehiculos/vehiculos.module';
import { EmpleadosModule } from './../empleados/empleados.module';
import { Module } from '@nestjs/common';
import { EstacionamientoController } from './estacionamiento.controller';
import { EstacionamientoService } from './services/estacionamiento.service';
import { PDFModule } from 'nestjs-pdf';

@Module({
  imports: [
    PDFModule.register({
      view: {
        root: '/common/template',
        engine: 'pug',
      },
    }),
    EmpleadosModule,
    VehiculosModule,
    TiposVehiculoModule,
    PagosModule,
    RegistrosModule,
    BitacorasModule,
  ],
  controllers: [EstacionamientoController],
  providers: [EstacionamientoService],
})
export class EstacionamientoModule {}
