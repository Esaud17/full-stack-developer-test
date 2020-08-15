import { Test, TestingModule } from '@nestjs/testing';
import { EstacionamientoService } from './estacionamiento.service';

describe('EstacionamientoService', () => {
  let service: EstacionamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstacionamientoService],
    }).compile();

    service = module.get<EstacionamientoService>(EstacionamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
