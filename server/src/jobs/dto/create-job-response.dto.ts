import { ApiProperty } from '@nestjs/swagger';

export class CreateJobResponseDto {
  @ApiProperty({
    example: '2d7f3c89-87c9-44f2-bfa9-8d4c2cb1a9c2',
  })
  jobId!: string;
}
