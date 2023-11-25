import { Module, forwardRef } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from './contractors.entity';
import { ContractorPayment } from './contractors_payment.entity';
import { ContractorPaymentCondition } from './contractors_payment_condition.entity';
import { ContractorsRouter } from './contractors.router';
import { ProjectsModule } from '@server/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contractor]),
    TypeOrmModule.forFeature([ContractorPayment]),
    TypeOrmModule.forFeature([ContractorPaymentCondition]),
    forwardRef(() => ProjectsModule),
  ],
  controllers: [],
  providers: [ContractorsService, ContractorsRouter],
  exports: [
    TypeOrmModule.forFeature([Contractor]),
    TypeOrmModule.forFeature([ContractorPayment]),
    TypeOrmModule.forFeature([ContractorPaymentCondition]),
    ContractorsService,
    ContractorsRouter,
  ]
})
export class ContractorsModule {}
