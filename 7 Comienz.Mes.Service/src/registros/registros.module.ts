import { REGISTROS } from './../common/models/models';
import { Module } from '@nestjs/common';
import { RegistrosService } from './services/registros.service';
import { RegistroSchema } from './schemas/registros.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: REGISTROS.name,
        useFactory: () => {
          const schema = RegistroSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RegistrosService],
  exports: [RegistrosService],
})
export class RegistrosModule {}
