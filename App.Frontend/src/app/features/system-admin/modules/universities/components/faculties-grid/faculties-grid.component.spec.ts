/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacultiesGridComponent } from './faculties-grid.component';

describe('GetAllFacultiesComponent', () => {
  let component: FacultiesGridComponent;
  let fixture: ComponentFixture<FacultiesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultiesGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
