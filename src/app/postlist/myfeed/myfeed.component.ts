import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "app-myfeed",
  templateUrl: "./myfeed.component.html",
  styleUrls: ["./myfeed.component.css"],
})
export class MyfeedComponent implements OnInit {
  public profileId;
  public postData;
  public isDataFetch = false;
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
  public yourPost = false;
  public takeBookResult;
  public isNearByPost = false;
  public tabname;
  public isUnauth;
  public message;
  public bookPost;
  public totalPages = 10;
  public page = 1;
  public myPostPage = 1;
  public nearbyPostPage = 1;
  public newPostPage = 1;
  public limit = 5;
  public nearByPostOffset;
  public myPostOffset;
  public newPostOffset;
  public shareLink;
  public isCopy = false;
  public isShare = false;
  public isPostSaved = false;
  public savePostId;
  public sharePostId;
  public editPostId;
  public savePostMessage;
  public copyPostMessage;
  public isChatError = false;
  public chatMessage;
  public chatPostId;
  public loginMessage;
  public isShowLoginMessage = false;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postData = null;
    this.postService.getPopularBook().subscribe(
      (res) => {
        this.bookPost = res.message;
      },
      (err) => {}
    );
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.isUnauth = true;
      this.note =
        "please login in order to access nearby post and your post. However you can access advance search and search by book without login";

      this.tabname = "New Posts:";
      this.isNearByPost = false;
      this.isDataFetch = false;
      this.postData = null;
      this.yourPost = false;
      this.newPostOffset = 0;

      this.postService.getAllPost(this.newPostOffset, this.limit).subscribe(
        (res) => {
          this.isDataFetch = true;
          this.postData = res.message;
          this.totalPages = res.total;

          this.message = this.totalPages + " Post/s found";
          if (!this.postData.take_book_id) {
            this.takeBook = "Book is not specified by user";
            this.takeBookAuthor = "Book author is not specified by user";
          }
        },
        (err) => {
          this.note =
            "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
        }
      );
    } else {
      this.note =
        "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
      this.tabname = "Nearby Posts:";
      this.isNearByPost = true;
      this.profileId = localStorage.getItem("profileid");
      this.yourPost = false;
      this.isUnauth = false;

      this.nearByPostOffset = 0;
      this.postService
        .getNearByPost(this.profileId, this.nearByPostOffset, this.limit)
        .subscribe(
          async (res) => {
            this.postData = res.message;
            this.totalPages = res.total;
            this.isDataFetch = true;
            this.message = this.totalPages + " Post/s found";
            if (!this.postData.take_book_id) {
              this.takeBook = "Book is not specified by user";
              this.takeBookAuthor = "Book author is not specified by user";
            }
          },
          (err) => {
            if (err.status == 401) {
              localStorage.clear();
              this.note =
                "please login in order to access nearby post and your post. However you can access advance search  and new post without login";
              return;
            }
            this.note =
              "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
          }
        );
    }
  }
  generateSharableLink(postId, title) {
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
  myFeedByLocation(page) {
    this.tabname = "Nearby Posts:";

    this.isNearByPost = true;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = false;
    this.page = page;

    this.nearByPostOffset = (page - 1) * this.limit;
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.note =
        "please login in order to access nearby post and your post. However you can access advance search  and new post without login";
    } else {
      this.profileId = localStorage.getItem("profileid");
      this.postService
        .getNearByPost(this.profileId, this.nearByPostOffset, this.limit)
        .subscribe(
          (res) => {
            this.postData = res.message;
            this.isDataFetch = true;
            this.totalPages = res.total;
            this.message = this.totalPages + " Post/s found";
            if (!this.postData.take_book_id) {
              this.takeBook = "Book is not specified by user";
              this.takeBookAuthor = "Book author is not specified by user";
            }
          },
          (err) => {
            if (err.status == 401) {
              localStorage.clear();
              this.note =
                "please login in order to access nearby post and your post. However you can access advance search and search post by book and new post without login";
              return;
            }
            this.note =
              "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
          }
        );
    }
  }
  myFeedByMyPost(page) {
    this.tabname = "Your Posts:";

    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = true;
    this.totalPages = 10;
    this.page = page;
    this.myPostOffset = (page - 1) * this.limit;
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.note =
        "please login in order to access nearby post and your post. However you can access advance search  and new post without login";
    } else {
      this.postService
        .getPostByProfile(this.profileId, this.myPostOffset, this.limit)
        .subscribe(
          (res) => {
            this.postData = res.message;
            this.isDataFetch = true;
            this.totalPages = res.total;

            this.message = this.totalPages + " Post/s found";
            if (!this.postData.take_book_id) {
              this.takeBook = "Book is not specified by user";
              this.takeBookAuthor = "Book author is not specified by user";
            }
          },
          (err) => {
            if (err.status == 401) {
              localStorage.clear();
              this.note =
                "please login in order to access nearby post and your post. However you can access advance search and search post by book and new post without login";
              return;
            }

            this.note =
              "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
          }
        );
    }
  }
  myFeedByNewPost(page) {
    this.tabname = "New Posts:";

    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = false;
    this.newPostOffset = (page - 1) * this.limit;
    this.page = page;

    this.postService.getAllPost(this.newPostOffset, this.limit).subscribe(
      (res) => {
        this.isDataFetch = true;
        this.postData = res.message;
        this.totalPages = res.total;

        this.message = this.totalPages + " Post/s found";
        if (!this.postData.take_book_id) {
          this.takeBook = "Book is not specified by user";
          this.takeBookAuthor = "Book author is not specified by user";
        }
      },
      (err) => {
        this.note =
          "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
      }
    );
  }
  getPostByBookName() {
    this.isNearByPost = false;
    this.yourPost = false;
    this.postData = null;

    if (this.bookname && this.bookname.length > 0) {
      this.postService.getPostByBookName(this.bookname, 0, 10).subscribe(
        (res) => {
          this.isDataFetch = true;
          this.postData = res.message;
          this.totalPages = this.postData.length;

          this.message = this.postData.length + " Post/s found";
        },
        (err) => {
          this.isDataFetch = false;
          this.postData = null;
        }
      );
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
  deletePost(postId) {
    if (this.isUnauth) {
      console.log("lol");
      this.loginMessage = "please login ";
      this.isShowLoginMessage = true;
      setTimeout(() => {
        this.loginMessage = "";
        this.isShowLoginMessage = true;
      }, 2000);
      return;
    }
    let deletablePostData = {
      postId: postId,
      giveBookId: this.postData.give_book_id,
      takeBookId: this.postData.take_book_id,
    };
    this.postService.deletePost(deletablePostData).subscribe(
      (res) => {
        this.router.navigate(["/profile"]);
      },
      (err) => {}
    );
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
          this.savePostMessage = "";
          this.isPostSaved = false;
        }, 4000);
      }
    );
  }
  unSavePost(postId) {
    if (this.isUnauth) {
      console.log("lol");
      this.loginMessage = "please login ";
      this.isShowLoginMessage = true;
      setTimeout(() => {
        this.loginMessage = "";
        this.isShowLoginMessage = true;
      }, 2000);
      return;
    }
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
  getPageforMyPost(myPostPage) {
    this.myPostPage = myPostPage;
    this.myFeedByMyPost(this.myPostPage);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  getPageForNewPost(newPostPage) {
    //console.log(newPostPage);
    this.newPostPage = newPostPage;
    this.myFeedByNewPost(this.newPostPage);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  getPageForNearbyPost(nearbyPostPage) {
    //
    this.nearbyPostPage = nearbyPostPage;
    this.myFeedByLocation(this.nearbyPostPage);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    console.log(postId,title);
    this.router
      .navigateByUrl("/post", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`post/${postId}/${title.replace(/ /g, "_")}`]);
      });
  }
}
