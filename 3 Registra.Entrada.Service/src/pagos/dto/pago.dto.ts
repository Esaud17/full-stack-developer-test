import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class Pago {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tiempo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vehiculo: string;

  @ApiProperty()
  registro: string;

  constructor(partial: Partial<Pago>) {
    Object.assign(this, partial);
  }
}
