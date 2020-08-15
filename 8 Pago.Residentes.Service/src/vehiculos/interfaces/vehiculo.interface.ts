import { Document } from 'mongoose';

export interface IVehiculo extends Document {
  readonly placa: string;
  readonly tipo: string;
  readonly accion: string;
  readonly bitacora: string;
}
