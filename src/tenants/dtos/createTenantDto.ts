import { IsNotEmpty, IsString } from 'class-validator';

export class createTenantDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;
}
