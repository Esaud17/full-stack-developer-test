import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignIn {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
