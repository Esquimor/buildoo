import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorsModule } from '@server/contractors/contractors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), ContractorsModule],
  providers: [OrganizationService],
  exports: [OrganizationService, TypeOrmModule.forFeature([Organization])]
})
export class OrganizationModule {}
