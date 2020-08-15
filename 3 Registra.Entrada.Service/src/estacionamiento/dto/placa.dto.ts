import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class Placa {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  placa: string;

  constructor(partial: Partial<Placa>) {
    Object.assign(this, partial);
  }
}
