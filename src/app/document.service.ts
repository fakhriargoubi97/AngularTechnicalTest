import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from './models/Document';

const apiUrl = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  create(document: Document) {
    return this.http.post<any>(apiUrl + '/documents/',document );
  }
  getDocuments():Observable<any>{
    return this.http.get(apiUrl+"/documents/");
  }
  getDocumentById(id:any):Observable<any>{
    return this.http.get(apiUrl+"/documents/"+id)
  }
  delete(id:any) {
    return this.http.delete(apiUrl+"/documents/"+id)
  }
  update(document:Document) {
    return this.http.put(apiUrl+"/documents/"+document.id,document)
  }

}
