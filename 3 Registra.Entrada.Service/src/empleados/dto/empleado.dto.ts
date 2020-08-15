import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class Empleado {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

 constructor(partial: Partial<Empleado>) {
    Object.assign(this, partial);
  }
}
