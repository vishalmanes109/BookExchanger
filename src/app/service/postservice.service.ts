import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../module/post';
@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  private url=`https://localhost:3000/post`;
  constructor(private http:HttpClient) { }

  getpost():Observable<Post[]>{
    return this.http.get<Post[]>(this.url);
  
}
}
