import { Document } from 'mongoose';

export interface ITipoVehiculo extends Document {
  readonly tipo: string;
}
