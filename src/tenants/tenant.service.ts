import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from './tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
  ) {}

  async create(data: Partial<Tenant>) {
    const t = new this.tenantModel(data);
    return t.save();
  }

  // async findByDomain(domain: string) {
  //   const tenant = await this.tenantModel.findOne({ domain }).exec();
  //   if (!tenant) throw new NotFoundException('Tenant not found');
  //   return tenant;
  // }

  async findById(id: string) {
    return this.tenantModel.findById(id).exec();
  }
}
