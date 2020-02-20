import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithistoryuserComponent } from './edithistoryuser.component';

describe('EdithistoryuserComponent', () => {
  let component: EdithistoryuserComponent;
  let fixture: ComponentFixture<EdithistoryuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithistoryuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithistoryuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
