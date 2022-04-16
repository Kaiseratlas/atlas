import { Test, TestingModule } from '@nestjs/testing';
import { SpritesController } from './sprites.controller';

describe('SpritesController', () => {
  let controller: SpritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpritesController],
    }).compile();

    controller = module.get<SpritesController>(SpritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
