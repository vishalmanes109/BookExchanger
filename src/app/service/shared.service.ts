import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private postId;

  constructor() {}

  storePostData(PostData) {}
  KeepPostId(postId){
    this.postId=postId
  }
  getPostId() {
    return this.postId;
  }
}
