import { ApiProperty } from '@nestjs/swagger';

export class Metadata {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
