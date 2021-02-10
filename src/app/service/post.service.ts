import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
    console.log(giveBookId);
    return this.http.get<any>(this._bookUrl + "givebook/" + giveBookId);
  }

  getTakeBook(takeBookId): Observable<any> {
    return this.http.get<any>(this._bookUrl + "takebook/" + takeBookId);
  }
  getNearByPost(profileId): Observable<any> {
    return this.http.get<any>(this._postUrl + "nearby/" + profileId);
  }
  getAllPost() {
    return this.http.get<any>(this._postUrl + "all");
  }
  updatePost(updatePostData) {
    return this.http.patch<any>(this._postUrl, updatePostData);
  }
  deletePost(deletePostData) {
    let headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");

    console.log("deletePostData", deletePostData);
    let params = new HttpParams();
    params = params.append("post_id", deletePostData.postId);
    params = params.append("give_book_id", deletePostData.giveBookId);
    params = params.append("take_book_id", deletePostData.takeBookId);

    const option = {
      headers: headers,
      params: params,
    };
    console.log(option);

    return this.http.delete<any>(this._postUrl, option);
  }
  getPostByBookName(book) {
    return this.http.get<any>(this._postUrl + "book/" + book);
  }
  getPostByAuthor(author) {
    return this.http.get<any>(this._postUrl + "author/"+ author);
  }
  getPostByUser(username) {
    console.log("username", username);
    return this.http.get<any>(this._postUrl + "user/"+ username);
  }
  getPostByExcatLocation(location) {
    return this.http.get<any>(this._postUrl + "locations/"+ location);
  }
  getPostByTitle(title) {
    console.log(title)
    return this.http.get<any>(this._postUrl + "title/"+ title);
  }
}
