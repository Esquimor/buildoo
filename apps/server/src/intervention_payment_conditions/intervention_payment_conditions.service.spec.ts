import { Test, TestingModule } from '@nestjs/testing';
import { InterventionPaymentConditionsService } from './intervention_payment_conditions.service';

describe('InterventionPaymentConditionsService', () => {
  let service: InterventionPaymentConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterventionPaymentConditionsService],
    }).compile();

    service = module.get<InterventionPaymentConditionsService>(InterventionPaymentConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
