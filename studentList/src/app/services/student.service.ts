import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http : HttpClient) { }
  public getStudent():any{
    return this._http.get("http://localhost:3000/fetch");
  }
  public insertStudent(obj:any):any{
    return this._http.post("http://localhost:3000/insert",obj)
  }
  public updateStudent(obj:any):any{
    return this._http.post("http://localhost:3000/update",obj)
  }
  public deleteStudent(obj:any):any{
    return this._http.post("http://localhost:3000/update",obj)
  }
}
