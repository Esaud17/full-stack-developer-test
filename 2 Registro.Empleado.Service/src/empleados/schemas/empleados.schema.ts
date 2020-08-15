import * as mongoose from 'mongoose';

export const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  usuario: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true}
},{ timestamps: true });

EmpleadoSchema.index({ email: 1 }, { unique: true });
EmpleadoSchema.index({ usuario: 1 }, { unique: true });