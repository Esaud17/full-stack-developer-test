import { Empleado } from './../dto/empleado.dto';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IEmpleado } from '../interfaces/empleado.interface';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { EMPLEADOS } from 'src/common/models/models';

@Injectable()
export class EmpleadosService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(EMPLEADOS.name)
    private readonly model: Model<IEmpleado>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async VerifyPassword(password: string, compare: string): Promise<boolean> {
    return await bcrypt.compare(password, compare);
  }

  async find(): Promise<IEmpleado[]> {
    const records = await this.model.find();
    return records;
  }

  async findByEmail(email: string): Promise<IEmpleado> {
    return await await this.model.findOne({ email: email });
  }

  async get(Id: string): Promise<IEmpleado> {
    const record = await this.model.findById(Id);
    return record;
  }

  async create(createDTO: Empleado): Promise<IEmpleado> {
    const hash = await this.hashPassword(createDTO.password);
    const records = new this.model(_.assignIn(createDTO, { password: hash }));
    return await records.save();
  }

  async delete(Id: string): Promise<IEmpleado> {
    const record = await this.model.findOneAndDelete(Types.ObjectId(Id));
    return record;
  }

  async update(Id: string, createDTO: Empleado): Promise<IEmpleado> {
    const record = await this.model.findByIdAndUpdate(Id, createDTO, {
      new: true,
    });
    return record;
  }
}
