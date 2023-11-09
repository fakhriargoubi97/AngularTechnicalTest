import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotateDocumentWithLabelsComponent } from './anotate-document-with-labels.component';

describe('AnotateDocumentWithLabelsComponent', () => {
  let component: AnotateDocumentWithLabelsComponent;
  let fixture: ComponentFixture<AnotateDocumentWithLabelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotateDocumentWithLabelsComponent]
    });
    fixture = TestBed.createComponent(AnotateDocumentWithLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
