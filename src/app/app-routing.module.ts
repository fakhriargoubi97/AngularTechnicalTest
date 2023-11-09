import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { AnotateDocumentWithLabelsComponent } from './anotate-document-with-labels/anotate-document-with-labels.component';

const routes: Routes = [
  {path: 'documentList',component: DocumentComponent},
  {path: 'annotations/:id',component: AnotateDocumentWithLabelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
