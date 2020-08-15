import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';
import { TipoMovimientoEnum } from '../enums/tipo-movimiento.enum';

export class Bitacora {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  empleado: string;

  @ApiProperty()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(TipoMovimientoEnum)
  tipo_movimiento: string;

  @ApiProperty()
  @IsNotEmpty()
  vehiculo: string;

    constructor(partial: Partial<Bitacora>) {
    Object.assign(this, partial);
  }
}
