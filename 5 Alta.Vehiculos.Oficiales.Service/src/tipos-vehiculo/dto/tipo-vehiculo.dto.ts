import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class TipoVehiculo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipo: string;

  constructor(partial: Partial<TipoVehiculo>) {
    Object.assign(this, partial);
  }
}
