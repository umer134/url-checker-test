import { ApiProperty } from '@nestjs/swagger';

export class JobProgressDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  processed!: number;

  @ApiProperty()
  success!: number;

  @ApiProperty()
  errors!: number;
}
