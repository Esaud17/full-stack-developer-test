import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class RegistroEstacionamiento {
         @ApiProperty()
         @IsNotEmpty()
         @IsString()
         placa: string;

         @ApiProperty()
         @IsNotEmpty()
         @IsDateString()
         entrada: string;

         @ApiProperty()
         @IsNotEmpty()
         @IsDateString()
         accion: string;

         @ApiProperty()
         importe: number;

         @ApiProperty()
         tiempo: number;

         constructor(partial: Partial<RegistroEstacionamiento>) {
           Object.assign(this, partial);
         }
       }
