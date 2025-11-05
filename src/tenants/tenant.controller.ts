import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { createTenantDto } from './dtos/createTenantDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@ApiBearerAuth('access-token')
@Controller('tenant')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TenantController {
  constructor(private readonly TenantService: TenantService) {}
  @Post()
  @Roles(Role.ADMIN)
  async createTenant(@Body() tenantDto: createTenantDto) {
    const tenant = await this.TenantService.create(tenantDto);
    return {
      message: 'Tenant created successfully',
      tenant,
    };
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    const tenant = await this.TenantService.findById(id);
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }
}
