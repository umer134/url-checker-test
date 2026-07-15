import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { CreateJobResponseDto } from './dto/create-job-response.dto';
import { JobListItemDto } from './dto/job-list-item.dto';
import { JobDetailsDto } from './dto/job-details.dto';
import { CancelJobResponseDto } from './dto/cancel-job-response.dto';

@ApiTags('jobs')
@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @ApiOperation({
    summary: 'Create URL validation job',
  })
  @ApiCreatedResponse({
    type: CreateJobResponseDto,
  })
  @Post()
  create(@Body() dto: CreateJobDto) {
    const jobId = this.jobService.create(dto);

    return {
      jobId,
    };
  }

  @ApiOperation({
    summary: 'Get jobs list',
  })
  @ApiOkResponse({
    type: JobListItemDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @ApiOperation({
    summary: 'Get job details',
  })
  @ApiOkResponse({
    type: JobDetailsDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @ApiOperation({
    summary: 'Cancel job',
  })
  @ApiOkResponse({
    type: CancelJobResponseDto,
  })
  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.jobService.cancel(id);
  }
}
