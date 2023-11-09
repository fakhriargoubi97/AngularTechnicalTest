import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annotation } from './models/Annotation';
import { AnnotationPost } from './models/AnnotationPost';
const apiUrl = 'http://localhost:8000/api';
@Injectable({
  providedIn: 'root'
})
export class AnotationService {

  constructor(private http: HttpClient) { }

  create(annotation: AnnotationPost) {
    return this.http.post<any>(apiUrl + '/annotations/',annotation );
  }
  getAnnotations():Observable<any>{
    return this.http.get(apiUrl+"/annotations/");
  }
  getAnnotationById(id:any):Observable<any>{
    return this.http.get(apiUrl+"/annotations/"+id)
  }
  delete(id:any) {
    return this.http.delete(apiUrl+"/annotations/"+id)
  }
  update(annotation:Annotation) {
    return this.http.put(apiUrl+"/annotations/"+annotation.id,annotation)
  }
}
