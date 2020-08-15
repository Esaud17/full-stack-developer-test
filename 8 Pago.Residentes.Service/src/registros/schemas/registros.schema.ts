import * as mongoose from 'mongoose';

export const RegistroSchema = new mongoose.Schema({
  tiempo: { type: Number, required: true },
  importe: { type: Number, required: true },
  vehiculo: { type: String, required: true },
  status: { type: Boolean, required: true}
},{ timestamps: true });
