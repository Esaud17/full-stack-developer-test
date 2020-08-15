import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty()
  access_token: string;

  constructor(partial: Partial<AccessToken>) {
    Object.assign(this, partial);
  }
}
