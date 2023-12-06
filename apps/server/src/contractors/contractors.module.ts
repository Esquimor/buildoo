import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from './contractors.entity';
import { ContractorsRouter } from './contractors.router';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contractor]),
  ],
  controllers: [],
  providers: [ContractorsService, ContractorsRouter],
  exports: [
    TypeOrmModule.forFeature([Contractor]),
    ContractorsService,
    ContractorsRouter,
  ]
})
export class ContractorsModule {}
