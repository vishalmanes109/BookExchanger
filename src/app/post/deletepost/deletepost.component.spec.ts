import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepostComponent } from './deletepost.component';

describe('DeletepostComponent', () => {
  let component: DeletepostComponent;
  let fixture: ComponentFixture<DeletepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
