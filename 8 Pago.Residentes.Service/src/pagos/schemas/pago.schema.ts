import * as mongoose from 'mongoose';

export const PagoSchema = new mongoose.Schema({
  tiempo: { type: Number, required: true },
  total: { type: Number, required: true },
  vehiculo: { type: String, required: true },
  registro: { type: String },
},{ timestamps: true });