import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpleadosModule } from './empleados/empleados.module';
import { PDFModule } from 'nestjs-pdf';
import moment from 'moment';
import { ConfigDefaultModule } from 'config/configuration';

import { AuthModule } from './auth/auth.module';
import { BitacorasModule } from './bitacoras/bitacoras.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { PagosModule } from './pagos/pagos.module';
import { RegistrosModule } from './registros/registros.module';
import { TiposVehiculoModule } from './tipos-vehiculo/tipos-vehiculo.module';
import { EstacionamientoModule } from './estacionamiento/estacionamiento.module';

@Module({
  imports: [
    ConfigDefaultModule,
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    EmpleadosModule,
    TiposVehiculoModule,
    VehiculosModule,
    BitacorasModule,
    RegistrosModule,
    PagosModule,
    EstacionamientoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'MomentWrapper',
      useValue: moment,
    },
  ],
})
export class AppModule {}
