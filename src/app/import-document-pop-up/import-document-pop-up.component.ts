import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { Document } from '../models/Document';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-import-document-pop-up',
  templateUrl: './import-document-pop-up.component.html',
  styleUrls: ['./import-document-pop-up.component.css']
})
export class ImportDocumentPopUpComponent {
  title:  string = "";
  firstname="";
  fileContent: string ="";
    constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef : MatDialog,private documentService: DocumentService){
    this.firstname = data.firstName;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = e.target?.result as string;
      };
      reader.readAsText(file);
    }
  }
  importDocument(){
    if (this.title != "" && this.fileContent !="") {
      let document = new Document(0,this.title,this.fileContent);

      this.documentService.create(document).subscribe((data:Document)=>{
        if(data.id != undefined) {
          window.location.reload();
        }
        else{
          alert("Error while trying to import the document")
        }
      })
      this.dialogRef.closeAll();
    }
    else {
      alert("document title or file cannot be empty")
    }
  }
  closeDocumentPopUp() {
    this.dialogRef.closeAll();
  }
}
