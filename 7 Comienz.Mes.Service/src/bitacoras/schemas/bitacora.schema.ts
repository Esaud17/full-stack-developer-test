import { EMPLEADOS, VEHICULOS } from './../../common/models/models';
import * as mongoose from 'mongoose';
import { TipoMovimientoEnum } from '../enums/tipo-movimiento.enum';

export const BitacoraSchema = new mongoose.Schema(
  {
    empleado: { type: mongoose.Schema.Types.ObjectId, ref: EMPLEADOS.name },
    fecha: { type: Date, required: true },
    tipo_movimiento: {
      type: String,
      required: true,
      enum: Object.values(TipoMovimientoEnum),
    },
    vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: VEHICULOS.name },
  },
  { timestamps: true },
);
