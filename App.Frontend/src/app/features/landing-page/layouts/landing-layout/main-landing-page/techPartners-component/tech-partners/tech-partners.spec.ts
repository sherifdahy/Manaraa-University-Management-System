import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPartners } from './tech-partners';

describe('TechPartners', () => {
  let component: TechPartners;
  let fixture: ComponentFixture<TechPartners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechPartners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechPartners);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
