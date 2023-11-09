import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from './models/Label';
const apiUrl = 'http://localhost:8000/api';
@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  create(label: Label) {
    return this.http.post<any>(apiUrl + '/labels/',label );
  }
  getLabels():Observable<any>{
    return this.http.get(apiUrl+"/labels/");
  }
  getLabelById(id:any):Observable<any>{
    return this.http.get(apiUrl+"/labels/"+id)
  }
  delete(id:any) {
    return this.http.delete(apiUrl+"/labels/"+id)
  }
  update(label:Label) {
    return this.http.put(apiUrl+"/labels/"+label.id,label)
  }
}
