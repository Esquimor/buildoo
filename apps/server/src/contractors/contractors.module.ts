import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from './contractors.entity';
import { ContractorPayment } from './contractors_payment.entity';
import { ContractorPaymentCondition } from './contractors_payment_condition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contractor]),
    TypeOrmModule.forFeature([ContractorPayment]),
    TypeOrmModule.forFeature([ContractorPaymentCondition])
  ],
  controllers: [],
  providers: [ContractorsService],
  exports: [
    TypeOrmModule.forFeature([Contractor]),
    TypeOrmModule.forFeature([ContractorPayment]),
    TypeOrmModule.forFeature([ContractorPaymentCondition]),
    ContractorsService
  ]
})
export class ContractorsModule {}
