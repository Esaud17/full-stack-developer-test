import { Vehiculo } from './../dto/vehiculo.dto';
import { IVehiculo } from './../interfaces/vehiculo.interface';
import { VEHICULOS } from './../../common/models/models';
import { Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectModel(VEHICULOS.name)
    private readonly model: Model<IVehiculo>,
  ) {}

  async find(): Promise<IVehiculo[]> {
    const records = await this.model.find();
    return records;
  }

  async get(Id: string): Promise<IVehiculo> {
    const record = await this.model.findById(Id);
    return record;
  }

  async findByPlaca(placa: string): Promise<IVehiculo> {
    const record = await this.model.findOne({ placa: placa });
    return record;
  }

  async create(CreateDto: Vehiculo): Promise<IVehiculo> {
    const record = new this.model(CreateDto);
    return record.save();
  }

  async delete(Id: string): Promise<IVehiculo> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async update(Id: string, CreateDto: Vehiculo): Promise<IVehiculo> {
    const record = await this.model.findByIdAndUpdate(Id, CreateDto, {
      new: true,
    });
    return record;
  }
}
