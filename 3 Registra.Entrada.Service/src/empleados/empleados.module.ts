import { EMPLEADOS } from './../common/models/models';
import { Module } from "@nestjs/common";
import { EmpleadosService } from "./services/empleados.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EmpleadoSchema } from "./schemas/empleados.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: EMPLEADOS.name,
        useFactory: () => {
          const schema = EmpleadoSchema;
          schema.plugin(require('mongoose-delete'), { deletedAt: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
