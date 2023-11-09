import { Component } from '@angular/core';
import { Label } from '../models/Label';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../models/Document';
import { Annotation } from '../models/Annotation';
import { LabelService } from '../label.service';
import { AnotationService } from '../anotation.service';
import { MatDialog } from '@angular/material/dialog';
import { AddlabelpopupComponent } from '../addlabelpopup/addlabelpopup.component';
import { Export } from '../models/Export';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-anotate-document-with-labels',
  templateUrl: './anotate-document-with-labels.component.html',
  styleUrls: ['./anotate-document-with-labels.component.css']
})
export class AnotateDocumentWithLabelsComponent {
labels:Label[] = [];
document:any  ;
idSelectLabel:number=0;
annotations: Annotation[] =[];
documentShown:string="";
stylePositions = [[3,3],[15,3]];
fileUrl:any;
constructor(private sanitizer: DomSanitizer,private dialogRef : MatDialog,private router:Router,private ar:ActivatedRoute,private documentService:DocumentService,private labelService:LabelService,private annotationService:AnotationService,){

}
ngOnInit() {
  this.documentService.getDocumentById(this.ar.snapshot.params['id']).subscribe((data:Document)=>{
    console.log(data)
    this.document = { ...data }
    this.documentShown = this.sanitizer.bypassSecurityTrustHtml(`<div *ngIf="annotations.length!=0">
    <ng-container *ngFor="let annotation of annotations; index as i">
<ng-container *ngIf="i==0">{{document.text | slice:0:annotations[0].start}}</ng-container><ng-container *ngIf="i!=0">{{document.text | slice:annotations[i-1].start+annotations[i-1].end:annotations[i].start}}</ng-container><span [ngStyle]="{'background-color': annotations[i].label?.color,'border': 'solid ' +annotations[i].label?.color}">{{document.text | slice:annotations[i].start:annotations[i].start+annotations[i].end}} <i style="background-color: azure;">{{annotations[i].label?.name}}</i></span><ng-container *ngIf="i==annotations.length-1">{{document.text | slice:annotations[i].start+annotations[i].end:document.text.length}}</ng-container>
    </ng-container></div>"`);    

  });
  this.labelService.getLabels().subscribe((data:Label[])=>{
    console.log(data)
    this.labels= data;
  })
  this.annotationService.getAnnotations().subscribe((data:Annotation[])=>{
    console.log(data)

    this.annotations= data;
  })
  // this.document = new Document(1,"test","there is a sloth that took him two months to move to another tree 1 km away")
  // this.labels = [new Label(1,"experience","red"),new Label(2,"Skills","yellow")]
  // this.annotations = [new Annotation(1,this.document,2,6,this.labels[0]),new Annotation(1,this.document,28,45,this.labels[0])]
  
}
selectLabel(id:number) {
this.idSelectLabel=id;
}
addAnnotation(){
  let selectedText = window.getSelection();
  console.log(selectedText?.rangeCount!==0)
  console.log(selectedText)
  let startingIndex = this.document.text.indexOf(selectedText)
  let endingIndex = startingIndex+selectedText?.toString().length
  let conflictWithOtherAnnotations=true;
  for (let annotation of this.annotations) {
    if ((startingIndex<annotation.start && endingIndex>annotation.start )||(startingIndex<annotation.end && endingIndex>annotation.end)) {
      conflictWithOtherAnnotations = false;
    }
  }
  if(conflictWithOtherAnnotations && startingIndex!=-1 && this.idSelectLabel != 0) {
  let annotation = new Annotation(0,this.document,startingIndex,endingIndex,this.labels.find(label=>label.id == this.idSelectLabel)??new Label(0,"",""))
  this.annotationService.create(annotation.toAnnotationPost()).subscribe(response=>{
    if (response.statusCode = 200) {
      window.location.reload();
    }
    else{
      alert("error")
    }
  })
  
  } else {
    alert("part or full sentence already annotated")
    selectedText?.empty()
  }
}

openAddLabelPopUp() {
  this.dialogRef.open(AddlabelpopupComponent,{
    data : {
      firstName:"test"
    }
  });
}

exportAnnotation() {
  let exportAnnotations = new Export(this.document.text,this.annotations.map((a) => {return a.toExport()}))
  let exportedJson = JSON.stringify(exportAnnotations)
  const blob = new Blob([exportedJson], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    //text Name
    const stringArr = [];
    for(let i = 0; i< 4; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    let fileName= stringArr.join('-');

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
  //   window.URL.revokeObjectURL(url);


  // if (window.navigator.msSaveOrOpenBlob) {
  //   window.navigator.msSaveBlob(this.uploader, "data.txt");
  // }else {
  //   const downloadLink = window.document.createElement('a');
  
  //   // get the this.uploader file type and put in type below
  //   downloadLink.href = window.URL.createObjectURL(new Blob([this.uploader], { type: ... }));
  
  //   downloadLink.download = "data.txt";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // }
  
}

}
