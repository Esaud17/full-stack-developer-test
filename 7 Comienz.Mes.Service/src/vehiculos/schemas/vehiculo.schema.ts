import { BITACORAS } from './../../common/models/models';
import { TipoMovimientoEnum } from './../../bitacoras/enums/tipo-movimiento.enum';
import * as mongoose from 'mongoose';
import { TipoVehiculotoEnum } from 'src/tipos-vehiculo/enums/tipo-vehiculo.enum';

export const VehiculoSchema = new mongoose.Schema(
         {
           placa: { type: String, required: true },
           tipo: {
             type: String,
             required: true,
             enum: Object.values(TipoVehiculotoEnum),
           },
           accion: {
             type: String,
             required: true,
             enum: Object.values(TipoMovimientoEnum),
             default: null,
           },
           bitacora: { type: mongoose.Schema.Types.ObjectId, ref: BITACORAS.name,  default: null},
         },
         { timestamps: true },
       );

VehiculoSchema.index({ placa: 1 }, { unique: true });