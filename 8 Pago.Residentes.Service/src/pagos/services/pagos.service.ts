import { PAGOS } from './../../common/models/models';
import { Injectable } from '@nestjs/common';
import { IPago } from '../interfaces/pago.interface';
import { Pago } from '../dto/pago.dto';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PagosService {
  constructor(
    @InjectModel(PAGOS.name)
    private readonly model: Model<IPago>,
  ) {}

  async find(): Promise<IPago[]> {
    const records = await this.model.find();
    return records;
  }

  async get(Id: string): Promise<IPago> {
    const record = await this.model.findById(Id);
    return record;
  }

  async create(CreateDto: Pago): Promise<IPago> {
    const record = new this.model(CreateDto);
    return record.save();
  }

  async delete(Id: string): Promise<IPago> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async update(Id: string, CreateDto: Pago): Promise<IPago> {
    const record = await this.model.findByIdAndUpdate(
      Id,
      CreateDto,
      {  new: true});
    return record;
  }
}
