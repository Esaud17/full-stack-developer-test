import { Test, TestingModule } from '@nestjs/testing';
import { TiposVehiculoService } from './tipos-vehiculo.service';

describe('TiposVehiculoService', () => {
  let service: TiposVehiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposVehiculoService],
    }).compile();

    service = module.get<TiposVehiculoService>(TiposVehiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
