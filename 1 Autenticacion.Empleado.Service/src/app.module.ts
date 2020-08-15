import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigDefaultModule } from 'config/configuration';

import { AuthModule } from './auth/auth.module';
import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [
    ConfigDefaultModule,
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    EmpleadosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
