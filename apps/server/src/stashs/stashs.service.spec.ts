import { Test, TestingModule } from '@nestjs/testing';
import { StashsService } from './stashs.service';

describe('StashsService', () => {
  let service: StashsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StashsService],
    }).compile();

    service = module.get<StashsService>(StashsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
