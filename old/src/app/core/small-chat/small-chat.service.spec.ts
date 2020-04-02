import { TestBed } from '@angular/core/testing';

import { SmallChatService } from './small-chat.service';

describe('SmallChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmallChatService = TestBed.get(SmallChatService);
    expect(service).toBeTruthy();
  });
});
