import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/access-token/roles.guard';
import { AddressParamsDto } from 'src/common/dtos/address-params.dto';
import { UserRole } from 'src/users/constants/user.constant';

import { StartSyncDto } from './dtos/start-sync.dto';
import { SyncResponseDto } from './dtos/sync-response.dto';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @ApiBearerAuth('bearer')
  @UseGuards(RoleGuard)
  @Roles([UserRole.ADMIN])
  @ApiOperation({
    summary: 'Start the sync event',
    description: 'Start syncing the data from the blockchain',
  })
  @ApiBody({ type: StartSyncDto })
  @Post('start')
  async startSync(@Body() startSyncDto: StartSyncDto) {
    return await this.syncService.startSync(
      startSyncDto.address,
      startSyncDto.fromBlock,
    );
  }

  @ApiBearerAuth('bearer')
  @UseGuards(RoleGuard)
  @Roles([UserRole.ADMIN])
  @ApiOperation({
    summary: 'Stop the sync event',
    description: 'Stop syncing the data from the blockchain',
  })
  @ApiBody({ type: AddressParamsDto })
  @Post('stop')
  async stopSync(@Body() stopSyncDto: AddressParamsDto) {
    return await this.syncService.stopSync(stopSyncDto.address);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(RoleGuard)
  @Roles([UserRole.ADMIN, UserRole.USER])
  @ApiOperation({
    summary: 'Get the sync status',
    description: 'Get the status of the sync event',
  })
  @ApiParam({
    name: 'address',
    description: 'The address of the PT contract',
    example: '0x9f56094c450763769ba0ea9fe2876070c0fd5f77',
  })
  @ApiResponse({
    status: 200,
    description: 'Sync status retrieved successfully',
    type: SyncResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Sync status not found for the given address',
    schema: {
      example: {
        statusCode: 404,
        message:
          'Sync status not found for address 0x1234567890abcdef1234567890abcdef12345678',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Failed to retrieve sync status',
        error: 'Internal Server Error',
      },
    },
  })
  @Get('status/:address')
  async getSyncStatus(
    @Param() params: AddressParamsDto,
  ): Promise<SyncResponseDto> {
    return await this.syncService.getSyncStatus(params.address);
  }
}
