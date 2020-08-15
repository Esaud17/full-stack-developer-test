import { Bitacora } from 'src/bitacoras/dto/bitacora.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class Vehiculo {
         @ApiProperty()
         @IsNotEmpty()
         @IsString()
         placa: string;

         @ApiProperty()
         @IsNotEmpty()
         @IsString()
         tipo: string;

         @ApiProperty()
         @IsNotEmpty()
         @IsString()
         accion: string;

         @ApiProperty()
         @IsNotEmpty()
         bitacora: string;

         constructor(partial: Partial<Vehiculo>) {
           Object.assign(this, partial);
         }
       }
