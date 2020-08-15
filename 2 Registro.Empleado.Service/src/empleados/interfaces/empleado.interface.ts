import { Document } from 'mongoose';
import { IMetadata } from 'src/common/interfaces/metadata.interface';

export interface IEmpleado extends Document {
  readonly nombre: string;
  readonly apellido: string;
  readonly usuario: string;
  readonly email: string;
  readonly password: string;
}