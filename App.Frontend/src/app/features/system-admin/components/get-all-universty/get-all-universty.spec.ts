import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUniversty } from './get-all-universty';

describe('GetAllUniversty', () => {
  let component: GetAllUniversty;
  let fixture: ComponentFixture<GetAllUniversty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllUniversty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllUniversty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
