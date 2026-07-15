import { ArrayNotEmpty, IsArray, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    type: [String],
    example: ['https://google.com', 'https://github.com'],
    description: 'List of URLs to validate',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  urls!: string[];
}
