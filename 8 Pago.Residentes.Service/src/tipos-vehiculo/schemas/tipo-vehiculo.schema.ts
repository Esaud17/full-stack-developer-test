import * as mongoose from 'mongoose';

export const TipoVehiculoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
},{ timestamps: true });