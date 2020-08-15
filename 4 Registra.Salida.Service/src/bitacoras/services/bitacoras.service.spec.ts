import { Test, TestingModule } from '@nestjs/testing';
import { BitacorasService } from './bitacoras.service';

describe('BitacorasService', () => {
  let service: BitacorasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitacorasService],
    }).compile();

    service = module.get<BitacorasService>(BitacorasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
