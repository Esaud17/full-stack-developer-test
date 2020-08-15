import { Test, TestingModule } from '@nestjs/testing';
import { EstacionamientoController } from './estacionamiento.controller';

describe('Estacionamiento Controller', () => {
  let controller: EstacionamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionamientoController],
    }).compile();

    controller = module.get<EstacionamientoController>(EstacionamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
