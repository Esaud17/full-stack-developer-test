import { Document } from 'mongoose';

export interface IBitacora extends Document {
  readonly empleado: string;
  readonly fecha: Date;
  readonly tipo_movimiento: string;
  readonly vehiculo: string;
}
