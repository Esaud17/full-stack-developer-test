import { Document } from 'mongoose';

export interface IRegistro extends Document {
  readonly tiempo: number;
  readonly importe: number;
  readonly vehiculo: string;
  readonly status: boolean;
}
