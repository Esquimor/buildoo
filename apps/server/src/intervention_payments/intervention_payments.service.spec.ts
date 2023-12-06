import { Test, TestingModule } from '@nestjs/testing';
import { InterventionPaymentsService } from './intervention_payments.service';

describe('InterventionPaymentsService', () => {
  let service: InterventionPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterventionPaymentsService],
    }).compile();

    service = module.get<InterventionPaymentsService>(InterventionPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
