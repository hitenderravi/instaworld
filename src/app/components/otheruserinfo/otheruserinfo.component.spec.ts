import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheruserinfoComponent } from './otheruserinfo.component';

describe('OtheruserinfoComponent', () => {
  let component: OtheruserinfoComponent;
  let fixture: ComponentFixture<OtheruserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheruserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtheruserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
