import { Component, Inject } from '@angular/core';
import { Label } from '../models/Label';
import { LabelService } from '../label.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addlabelpopup',
  templateUrl: './addlabelpopup.component.html',
  styleUrls: ['./addlabelpopup.component.css']
})
export class AddlabelpopupComponent {
  name:  string = "";
  color:string = "#000";
  firstname="";
  fileContent: string ="";
    constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef : MatDialog,private labelService: LabelService){
    this.firstname = data.firstName;
  }
  
  addLabel(){
    if (this.name != "") {
      let label = new Label(0,this.name,this.color);
      this.labelService.create(label).subscribe((data:Label)=>{
        if (data.id!=null) {
          window.location.reload()
        }
        else{
          alert("Error")
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
