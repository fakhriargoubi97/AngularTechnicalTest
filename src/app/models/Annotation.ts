import { AnnotationPost } from "./AnnotationPost";
import { Document } from "./Document";
import { ExportedAnnotation } from "./ExportedAnnotation";
import { Label } from "./Label";

export class Annotation {
  constructor(
    public id: number,
    public document: Document,
    public start: number,
    public end: number,
    public label: Label
  ) {}
  toExport() {
    return new ExportedAnnotation(this.start,this.end,this.label.name,this.document.text.slice(this.start,this.end))
  }

  toAnnotationPost() {
    return new AnnotationPost(this.id,this.document.id,this.start,this.end,this.label.id)
  }
}