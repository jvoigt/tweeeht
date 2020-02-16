import { Test, TestingModule } from '@nestjs/testing';
import { DebugMessageService } from './debug-message.service';

describe('DebugMessageService', () => {
  let service: DebugMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebugMessageService],
    }).compile();

    service = module.get<DebugMessageService>(DebugMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
