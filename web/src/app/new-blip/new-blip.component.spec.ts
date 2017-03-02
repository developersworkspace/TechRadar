/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewBlipComponent } from './new-blip.component';

describe('NewBlipComponent', () => {
  let component: NewBlipComponent;
  let fixture: ComponentFixture<NewBlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
