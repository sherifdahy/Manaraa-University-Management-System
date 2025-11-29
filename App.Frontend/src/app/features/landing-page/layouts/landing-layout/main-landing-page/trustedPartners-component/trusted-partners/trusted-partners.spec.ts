import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedPartners } from './trusted-partners';

describe('TrustedPartners', () => {
  let component: TrustedPartners;
  let fixture: ComponentFixture<TrustedPartners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrustedPartners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedPartners);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
