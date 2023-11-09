import { Component, } from '@angular/core';
import { Document } from '../models/Document';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ImportDocumentPopUpComponent } from '../import-document-pop-up/import-document-pop-up.component';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  constructor(private dialogRef : MatDialog,private router: Router,private documentService:DocumentService){}
   documents:Document[]= [] ;
  ngOnInit() {
    // this.documents = [new Document(1,"first document","bla bla bla"),new Document(2,"second document","bli bli bli")]
    this.documentService.getDocuments().subscribe(data=>{
      this.documents=data;
    })
  }

  goToAnotateDocumentPage(id:number){
    this.router.navigate(['/annotations', id]);
  }
  openImportDocumentPopUp() {
    this.dialogRef.open(ImportDocumentPopUpComponent,{
      data : {
        firstName:"test"
      }
    });
  }
}
