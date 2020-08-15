import { TIPOVEHICULO } from './../../common/models/models';
import { TipoVehiculo } from './../dto/tipo-vehiculo.dto';
import { Injectable } from '@nestjs/common';
import { ITipoVehiculo } from '../interfaces/tipo-vehiculo.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TiposVehiculoService {
  constructor(
    @InjectModel(TIPOVEHICULO.name)
    private readonly model: Model<ITipoVehiculo>,
  ) {}

  async find(): Promise<ITipoVehiculo[]> {
    const records = await this.model.find();
    return records;
  }

  async get(Id: string): Promise<ITipoVehiculo> {
    const record = await this.model.findById(Id);
    return record;
  }

  async create(CreateDto: TipoVehiculo): Promise<ITipoVehiculo> {
    const record = new this.model(CreateDto);
    return record.save();
  }

  async delete(Id: string): Promise<ITipoVehiculo> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async update(Id: string, CreateDto: TipoVehiculo): Promise<ITipoVehiculo> {
    const record = await this.model.findByIdAndUpdate(Id, CreateDto, {
      new: true,
    });
    return record;
  }
}
