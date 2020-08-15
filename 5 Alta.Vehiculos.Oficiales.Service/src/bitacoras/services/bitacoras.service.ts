import { BITACORAS } from './../../common/models/models';
import { Injectable } from '@nestjs/common';
import { IBitacora } from '../interfaces/bitacora.interface';
import { Model, Types } from 'mongoose';
import { Bitacora } from '../dto/bitacora.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BitacorasService {
  constructor(
    @InjectModel(BITACORAS.name)
    private readonly model: Model<IBitacora>,
  ) {}

  async find(): Promise<IBitacora[]> {
    const records = await this.model.find();
    return records;
  }

  async get(Id: string): Promise<IBitacora> {
    const record = await this.model.findById(Id);
    return record;
  }

  async create(createDTO: Bitacora): Promise<IBitacora> {
    const record = new this.model(createDTO);
    return record.save();
  }

  async delete(Id: string): Promise<IBitacora> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async remove(): Promise<any> {
    const record = await this.model.remove({});
    return record;
  }

  async update(Id: string, createDTO: Bitacora): Promise<IBitacora> {
    const record = await this.model.findByIdAndUpdate(Id, createDTO, {
      new: true,
    });
    return record;
  }
}
