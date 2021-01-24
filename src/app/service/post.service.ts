import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _postUrl = "http://localhost:3000/api/post/";
  private _bookUrl = "http://localhost:3000/api/book/";
  constructor(private http: HttpClient) {}
  addPost(postData) {
    //console.log("in servi",postData)

    return this.http.post<any>(this._postUrl, postData);
  }
  getPostByLocation(location) {
    return this.http.get<any>(this._postUrl + "location/" + location);
  }
  getPostByProfile(profileId) {
    return this.http.get<any>(this._postUrl + "profileid/" + profileId);
  }
  getPostByPostId(postId) {
    return this.http.get<any>(this._postUrl + "id/" + postId);
  }
  getGiveBook(giveBookId) {
    console.log(giveBookId)
    return this.http.get<any>(this._bookUrl + "givebook/" + giveBookId);
  }

  getTakeBook(takeBookId) {
    return this.http.get<any>(this._bookUrl + "takebook/" + takeBookId);
  }
  getNearByPost(profileId){
    return this.http.get<any>(this._postUrl + "nearby/" + profileId);

  }
}
