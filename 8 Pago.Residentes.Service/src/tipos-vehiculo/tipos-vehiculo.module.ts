import { TIPOVEHICULO } from './../common/models/models';
import { Module } from '@nestjs/common';
import { TiposVehiculoService } from './services/tipos-vehiculo.service';
import { TipoVehiculoSchema } from './schemas/tipo-vehiculo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TIPOVEHICULO.name,
        useFactory: () => {
          const schema = TipoVehiculoSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [TiposVehiculoService],
  exports: [TiposVehiculoService],
})
export class TiposVehiculoModule {}
