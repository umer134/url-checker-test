import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../types/job-status.enum';
import { JobProgressDto } from './job-progress.dto';
import { UrlResultDto } from './url-result.dto';

export class JobDetailsDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  createdAt!: Date;

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
    enum: JobStatus,
  })
  status!: JobStatus;

  @ApiProperty()
  cancelled!: boolean;

  @ApiProperty({
    type: JobProgressDto,
  })
  progress!: JobProgressDto;

  @ApiProperty({
    type: UrlResultDto,
    isArray: true,
  })
  urls!: UrlResultDto[];
}
