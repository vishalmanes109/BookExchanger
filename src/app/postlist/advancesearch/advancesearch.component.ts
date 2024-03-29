import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "app-advancesearch",
  templateUrl: "./advancesearch.component.html",
  styleUrls: ["./advancesearch.component.css"],
})
export class AdvancesearchComponent implements OnInit {
  public byBook = false;
  public byTitle = false;
  public byAuthor = false;
  public byLocation = false;
  public byUser = false;
  public isError = false;
  public isUnauth = false;
  private counter = 0;
  public message;
  public text;
  public postData;
  public isDataFetch = false;
  public profileId;
  public isBookNotFound = false;
  public giveBook;
  public takeBook;
  public takeBookAuthor;
  public giveBookAuthor;
  public isBookNotAvailable = false;
  public note;
  public entirePostData = {};
  public takeBookData = new Array();
  public takeBookId;
  public bookname;
  public loadingStart = false;
  //public sortBy = "location";
  public takeBookResult;
  public page = 1;
  public limit = 5;
  public offset = 1;
  public totalPages;
  public shareLink;
  public isCopy = false;
  public isShare = false;
  public yourPost = true;
  public sharePostId;
  public isPostSaved = false;
  public savePostId;
  public savePostMessage;
  public copyPostMessage;
  public isChatError = false;
  public chatMessage;
  public chatPostId;
  public editPostId;
  public loginMessage;
  public isShowLoginMessage = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.note = "";
    this.profileId = localStorage.getItem("profileid");
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.isUnauth = true;
      this.note = "please login";
    }
  }

  changeByBook() {
    this.byBook = !this.byBook;
    if (this.byBook == true) this.counter++;
    else this.counter--;
  }
  changeByAuthor() {
    this.byAuthor = !this.byAuthor;
    if (this.byAuthor == true) this.counter++;
    else this.counter--;
  }
  changeByTitle() {
    this.byTitle = !this.byTitle;
    if (this.byTitle == true) this.counter++;
    else this.counter--;
  }
  changeByLocation() {
    this.byLocation = !this.byLocation;
    if (this.byLocation == true) this.counter++;
    else this.counter--;
  }
  changeByUser() {
    this.byUser = !this.byUser;
    if (this.byUser == true) this.counter++;
    else this.counter--;
  }
  generateSharableLink(postId, title) {
    console.log(postId, title);
    this.isShare = true;
    this.isCopy = false;
    this.sharePostId = postId;

    this.shareLink = `https://www.bookxchanger.ninja/post/${postId}/${title.replace(
      / /g,
      "_"
    )}`;
    this.copyShareableLink(this.shareLink);

    setTimeout(() => {
      this.copyPostMessage = "";
    }, 1000);
  }
  copyShareableLink(link) {
    let copyBox = document.createElement("textarea");
    copyBox.style.position = "fixed";
    copyBox.style.left = "0";
    copyBox.style.top = "0";
    copyBox.style.opacity = "0";
    copyBox.value = link;
    document.body.appendChild(copyBox);
    copyBox.focus();
    copyBox.select();
    document.execCommand("copy");
    document.body.removeChild(copyBox);
    this.copyPostMessage = "Copied to clipboard!";
    setTimeout(() => {
      this.isCopy = true;
    }, 1000);
  }

  getNextPage(page) {
    this.page = page;
    this.searchPost(this.page);
  }

  searchPost(page) {
    this.isError = false;
    this.postData = null;
    this.isDataFetch = false;
    if (page) this.offset = (page - 1) * this.limit;
    else this.offset = 0;

    if (this.counter > 1) {
      this.note = "";

      this.isError = true;
      this.message = "Select Only ONE of the above parameter";
      return;
    }
    if (this.counter == 0) {
      this.note = "";

      this.isError = true;
      this.message = "Select Atleast ONE of the above parameter ";
      return;
    }
    if (!this.isError) {
      if (this.byBook) {
        this.loadingStart = true;
        this.postService
          .getPostByBookName(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              this.loadingStart = false;

              if (!this.postData.take_book_id) {
                this.isBookNotAvailable = true;
                this.takeBook = "Book is not specified by user";
                this.takeBookAuthor = "Book author is not specified by user";
              }

              return;
            },
            (err) => {
              this.isDataFetch = false;
              this.loadingStart = false;

              if (err.error.message != "Post does not exis") {
                this.isError = true;
                this.message =
                  "0 Post found for corresponding search, Try different keywords, check for spellings";
                return;
              }
              this.isError = true;
              this.message = "Error while fetching data please try again ";
            }
          );
      }
      if (this.byUser) {
        this.postService
          .getPostByUser(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              if (!this.postData.take_book_id) {
                this.isBookNotAvailable = true;
                this.takeBook = "Book is not specified by user";
                this.takeBookAuthor = "Book author is not specified by user";
              }
              return;
            },
            (err) => {
              this.isDataFetch = false;

              if (err.error.message != "Post does not exis") {
                this.isError = true;
                this.message =
                  "0 Post found for corresponding search, Try different keywords, check for spellings";
                return;
              }
              this.isError = true;
              this.message = "Error while fetching data please try again ";
            }
          );
      }
      if (this.byTitle) {
        this.postService
          .getPostByTitle(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              if (!this.postData.take_book_id) {
                this.isBookNotAvailable = true;
                this.takeBook = "Book is not specified by user";
                this.takeBookAuthor = "Book author is not specified by user";
              }
              return;
            },
            (err) => {
              this.isDataFetch = false;

              if (err.error.message != "Post does not exis") {
                this.isError = true;
                this.message =
                  "0 Post found for corresponding search, Try different keywords, check for spellings";
                return;
              }
              this.isError = true;
              this.message = "Error while fetching data please try again ";
            }
          );
      }
      if (this.byLocation) {
        this.postService
          .getPostByLocation(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              if (!this.postData.take_book_id) {
                this.isBookNotAvailable = true;
                this.takeBook = "Book is not specified by user";
                this.takeBookAuthor = "Book author is not specified by user";
              }
              return;
            },
            (err) => {
              this.isDataFetch = false;

              if (err.error.message != "Post does not exis") {
                this.isError = true;
                this.message =
                  "0 Post found for corresponding search, Try different keywords, check for spellings";
                return;
              }
              this.isError = true;
              this.message = "Error while fetching data please try again ";
            }
          );
      }
      if (this.byAuthor) {
        this.postService
          .getPostByAuthor(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;

              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              if (!this.postData.take_book_id) {
                this.isBookNotAvailable = true;
                this.takeBook = "Book is not specified by user";
                this.takeBookAuthor = "Book author is not specified by user";
              }
              return;
            },
            (err) => {
              this.isDataFetch = false;

              if (err.error.message != "Post does not exis") {
                this.isError = true;
                this.message =
                  "0 Post found for corresponding search, Try different keywords, check for spellings";
                return;
              }
              this.isError = true;
              this.message = "Error while fetching data please try again ";
            }
          );
      }
    }
  }

  editPost(postId) {
    this.editPostId = postId;
    if (this.isUnauth) {
      this.loginMessage = "please login ";
      this.isShowLoginMessage = true;
      setTimeout(() => {
        this.loginMessage = "";
        this.isShowLoginMessage = false;
        this.editPostId = null;
      }, 1000);
      return;
    }
    this.router
      .navigateByUrl("/updatepost", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`updatepost/${postId}`]);
      });
  }
  savePost(postId) {
    this.savePostId = postId;
    if (this.isUnauth) {
      this.loginMessage = "please login ";
      this.isShowLoginMessage = true;
      setTimeout(() => {
        this.loginMessage = "";
        this.isShowLoginMessage = false;
        this.savePostId = null;
      }, 1000);
      return;
    }
    let savePostData = {
      post_id: postId,
      profile_id: this.profileId,
    };
    this.isPostSaved = true;
    this.postService.savePost(savePostData).subscribe(
      (res) => {
        this.savePostId = savePostData.post_id;
        this.isPostSaved = true;
        this.savePostMessage =
          "Post Saved! you can manage saved post from your profile";

        setTimeout(() => {
          if (res.success == 1 && this.isPostSaved) {
            this.savePostMessage = "";
            this.isPostSaved = false;
          }
        }, 4000);
      },
      (err) => {
        this.savePostMessage =
          "This post is already saved! you can manage saved post from your profile";

        setTimeout(() => {
          this.isPostSaved = false;
          this.savePostMessage = "";
        }, 4000);
      }
    );
  }
  unSavePost(postId) {
    let unSavePostData = {
      post_id: postId,
      profile_id: this.profileId,
    };
    this.postService.unSavePost(unSavePostData).subscribe(
      (res) => {
        this.isPostSaved = false;
      },
      (err) => {}
    );
  }
  chat(postid) {
    this.chatPostId = postid;
    if (this.isUnauth) {
      this.loginMessage = "please login ";
      this.isShowLoginMessage = true;
      setTimeout(() => {
        this.loginMessage = "";
        this.isShowLoginMessage = false;
        this.chatPostId = null;
      }, 1000);
      return;
    }
    this.isChatError = true;
    this.chatMessage =
      "This feature is currently under production. You can communicate with user via email and mobile number mentioned in profile page. click on the username mention in the post. Sorry for the inconvenience";

    setTimeout(() => {
      this.isChatError = false;
      this.chatMessage = "";
    }, 10000);
  }
  openPost(postId, title) {
    //this.SharedService.KeepPostId(postId);
    this.router
      .navigateByUrl("/post", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`post/${postId}/${title.replace(/ /g, "_")}`]);
      });
  }
}
