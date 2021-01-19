import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _postUrl = "http://localhost:3000/api/post/";
  constructor(private http: HttpClient) {}
  addPost(postData) {
    console.log("in servi",postData)

    return this.http.post<any>(this._postUrl, postData);
  }
}
