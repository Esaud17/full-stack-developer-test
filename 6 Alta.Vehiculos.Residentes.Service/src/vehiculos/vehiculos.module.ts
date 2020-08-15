import { VEHICULOS } from './../common/models/models';
import { Module } from '@nestjs/common';
import { VehiculosService } from './services/vehiculos.service';
import { VehiculoSchema } from './schemas/vehiculo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VEHICULOS.name,
        useFactory: () => {
          const schema = VehiculoSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [VehiculosService],
  exports: [VehiculosService],
})
export class VehiculosModule {}
