import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDocumentPopUpComponent } from './import-document-pop-up.component';

describe('ImportDocumentPopUpComponent', () => {
  let component: ImportDocumentPopUpComponent;
  let fixture: ComponentFixture<ImportDocumentPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportDocumentPopUpComponent]
    });
    fixture = TestBed.createComponent(ImportDocumentPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
