import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Metadata } from 'src/common/dtos/metadata.serializer';

export class FilePdf {
         @ApiProperty()
         @IsNotEmpty()
         @IsString()
         namefile: string;

         constructor(partial: Partial<FilePdf>) {
           Object.assign(this, partial);
         }
       }
