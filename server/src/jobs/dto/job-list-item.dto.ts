import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../types/job-status.enum';

export class JobListItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({
    enum: JobStatus,
  })
  status!: JobStatus;

  @ApiProperty()
  total!: number;

  @ApiProperty()
  success!: number;

  @ApiProperty()
  errors!: number;
}
