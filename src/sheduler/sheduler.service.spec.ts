import { Test, TestingModule } from '@nestjs/testing';
import { ShedulerService } from './sheduler.service';

describe('ShedulerService', () => {
  let service: ShedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShedulerService],
    }).compile();

    service = module.get<ShedulerService>(ShedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
