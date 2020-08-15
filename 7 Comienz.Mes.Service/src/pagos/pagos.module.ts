import { PAGOS } from './../common/models/models';
import { Module } from '@nestjs/common';
import { PagosService } from './services/pagos.service';
import { PagoSchema } from './schemas/pago.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PAGOS.name,
        useFactory: () => {
          const schema = PagoSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [PagosService],
  exports: [PagosService],
})
export class PagosModule {}
