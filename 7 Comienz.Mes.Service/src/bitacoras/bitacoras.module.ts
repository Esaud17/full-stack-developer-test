import { BITACORAS } from './../common/models/models';
import { Module } from '@nestjs/common';
import { BitacorasService } from './services/bitacoras.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BitacoraSchema } from './schemas/bitacora.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: BITACORAS.name,
        useFactory: () => {
          const schema = BitacoraSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [BitacorasService],
  exports: [BitacorasService],
})
export class BitacorasModule {}
