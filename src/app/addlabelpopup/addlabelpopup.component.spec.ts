import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlabelpopupComponent } from './addlabelpopup.component';

describe('AddlabelpopupComponent', () => {
  let component: AddlabelpopupComponent;
  let fixture: ComponentFixture<AddlabelpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddlabelpopupComponent]
    });
    fixture = TestBed.createComponent(AddlabelpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
