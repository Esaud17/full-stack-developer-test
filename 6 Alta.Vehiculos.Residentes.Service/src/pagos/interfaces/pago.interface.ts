import { Document } from 'mongoose';

export interface IPago extends Document {
  readonly tiempo: number;
  readonly vehiculo: string;
  readonly registro: string;
  readonly total: number;
}
