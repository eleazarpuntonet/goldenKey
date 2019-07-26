import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorehandlerComponent } from './storehandler.component';

describe('StorehandlerComponent', () => {
  let component: StorehandlerComponent;
  let fixture: ComponentFixture<StorehandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorehandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorehandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
