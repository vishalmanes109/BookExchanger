import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _postUrl = "http://localhost:3000/api/post/";
  private _bookUrl = "http://localhost:3000/api/book/";
  private _imageUrl = "http://localhost:3000/api/upload/";

  constructor(private http: HttpClient) {}
  addPost(postData) {
    return this.http.post<any>(this._postUrl, postData);
  }

  getPostByProfile(profileId, offset, limit) {
    console.log("lol");
    return this.http.get<any>(
      this._postUrl + "profileid/" + profileId + "/" + offset + "/" + limit
    );
  }
  getPostByPostId(postId) {
    return this.http.get<any>(this._postUrl + "id/" + postId);
  }
  getGiveBook(giveBookId) {
    return this.http.get<any>(this._bookUrl + "givebook/" + giveBookId);
  }
  getTakeBook(takeBookId): Observable<any> {
    return this.http.get<any>(this._bookUrl + "takebook/" + takeBookId);
  }
  getNearByPost(profileId, offset, limit): Observable<any> {
    return this.http.get<any>(
      this._postUrl + "nearby/" + profileId + "/" + offset + "/" + limit
    );
  }
  getAllPost(offset, limit) {
    return this.http.get<any>(this._postUrl + "all/" + offset + "/" + limit);
  }
  updatePost(updatePostData) {
    return this.http.patch<any>(this._postUrl, updatePostData);
  }
  deletePost(deletePostData) {
    let headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");

    let params = new HttpParams();
    params = params.append("post_id", deletePostData.postId);
    params = params.append("give_book_id", deletePostData.giveBookId);
    params = params.append("take_book_id", deletePostData.takeBookId);

    const option = {
      headers: headers,
      params: params,
    };

    return this.http.delete<any>(this._postUrl, option);
  }
  getPostByBookName(book, offset, limit) {
    return this.http.get<any>(
      this._postUrl + "book/" + book + "/" + offset + "/" + limit
    );
  }
  getPostByAuthor(author, offset, limit) {
    return this.http.get<any>(
      this._postUrl + "author/" + author + "/" + offset + "/" + limit
    );
  }
  getPostByUser(username, offset, limit) {
    return this.http.get<any>(
      this._postUrl + "user/" + username + "/" + offset + "/" + limit
    );
  }
  getPostByTitle(title, offset, limit) {
    return this.http.get<any>(
      this._postUrl + "title/" + title + "/" + offset + "/" + limit
    );
  }
  getPostByLocation(location,offset,limit) {
    return this.http.get<any>(
      this._postUrl + "location/" + location + "/" + offset + "/" + limit
    );
  }
  getPopularBook() {
    return this.http.get<any>(this._bookUrl + "popularbooks");
  }
  uploadBookImage(imageData) {
    let data = { data: imageData };
    return this.http.post<any>(this._imageUrl, data);
  }
  savePost(savePostdata) {
    return this.http.post<any>(this._postUrl + "savepost", savePostdata);
  }
  unSavePost(unSavePostData) {
    let headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");

    let params = new HttpParams();
    params = params.append("post_id", unSavePostData.post_id);
    params = params.append("profile_id", unSavePostData.profile_id);

    const option = {
      headers: headers,
      params: params,
    };
    return this.http.delete<any>(this._postUrl + "savepost", option);
  }
  getSavedPost(profileId,offset,limit) {
    console.log(profileId);
    return this.http.get<any>(
      this._postUrl + "savepost/" + profileId + "/" + offset + "/" + limit
    );
  }
}
