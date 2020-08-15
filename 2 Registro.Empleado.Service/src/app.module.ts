import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpleadosModule } from './empleados/empleados.module';
import moment from 'moment';
import { ConfigDefaultModule } from 'config/configuration';

import { AuthModule } from './auth/auth.module';


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
