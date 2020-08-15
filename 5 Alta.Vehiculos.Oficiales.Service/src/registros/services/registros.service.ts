import { REGISTROS } from './../../common/models/models';
import { Injectable } from "@nestjs/common";
import { IRegistro } from "../interfaces/registro.interface";
import { Registro } from '../dto/registro.dto';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegistrosService {
  constructor(
    @InjectModel(REGISTROS.name)
    private readonly model: Model<IRegistro>,
  ) {}

  async find(): Promise<IRegistro[]> {
    const records = await this.model.find();
    return records;
  }

  async findByPlaca(placa: string): Promise<IRegistro> {
    const record = await this.model.findOne({ vehiculo: placa });
    return record;
  }

  async get(Id: string): Promise<IRegistro> {
    const record = await this.model.findById(Id);
    return record;
  }

  async create(CreateDto: Registro): Promise<IRegistro> {
    const record = new this.model(CreateDto);
    return record.save();
  }

  async delete(Id: string): Promise<IRegistro> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async remove(): Promise<any> {
    const record = await this.model.updateMany({}, { $set: { importe: 0, tiempo: 0} });
    return record;
  }

  async update(Id: string, CreateDto: Registro): Promise<IRegistro> {
    const record = await this.model.findByIdAndUpdate(Id, CreateDto, {
      new: true,
    });
    return record;
  }
}
