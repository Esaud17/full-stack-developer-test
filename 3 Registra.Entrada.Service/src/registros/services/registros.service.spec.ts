import { Test, TestingModule } from '@nestjs/testing';
import { RegistrosService } from './regisros.service';

describe('RegistrosService', () => {
  let service: RegistrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrosService],
    }).compile();

    service = module.get<RegistrosService>(RegistrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
