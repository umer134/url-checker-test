import { ApiProperty } from '@nestjs/swagger';

export class CancelJobResponseDto {
  @ApiProperty()
  success!: boolean;

  @ApiProperty({
    required: false,
  })
  message?: string;
}
