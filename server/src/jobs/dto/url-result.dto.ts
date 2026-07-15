import { ApiProperty } from '@nestjs/swagger';
import { UrlStatus } from '../types/url-status.enum';

export class UrlResultDto {
  @ApiProperty()
  url!: string;

  @ApiProperty({
    enum: UrlStatus,
  })
  status!: UrlStatus;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  httpStatus?: number;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  error?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  startedAt?: Date;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  finishedAt?: Date;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  duration?: number;
}
