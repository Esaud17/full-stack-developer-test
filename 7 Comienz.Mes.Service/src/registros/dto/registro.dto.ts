import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class Registro {
  @ApiProperty()
  @IsNotEmpty()
  tiempo: number;

  @ApiProperty()
  @IsNotEmpty()
  importe: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vehiculo: string;

  @ApiProperty()
  @IsNotEmpty()
  status: boolean;

  constructor(partial: Partial<Registro>) {
    Object.assign(this, partial);
  }
}
