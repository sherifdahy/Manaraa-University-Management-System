import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPage } from './university-page';

describe('UniversityPage', () => {
  let component: UniversityPage;
  let fixture: ComponentFixture<UniversityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniversityPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
