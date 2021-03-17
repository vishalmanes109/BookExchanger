import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "app-singlepost",
  templateUrl: "./singlepost.component.html",
  styleUrls: ["./singlepost.component.css"],
})
export class SinglepostComponent implements OnInit {
  public username;
  public title;
  public description;
  public date;
  public giveBook;
  public takeBook;
  public takeBookAuthor;
  public giveBookAuthor;
  public yourPost = false;
  public postId;
  public postData;
  public isDataFetch = false;
  public isBookNotFound = false;
  public isBookNotAvailable = false;
  public note;
  private profileId;
  public nearByPost;
  public isNearByPostExist;
  public isError;
  public isUnauth = false;
  public message;
  public shareLink;
  public isCopy = false;
  public isShare = false;
  public isPostSaved = false;
  public savePostId;
  public sharePostId;
  public savePostMessage;
  public isChatError = false;
  public chatMessage;
  public chatPostId;
  public editPostId;
  public loginMessage;
  public isShowLoginMessage = false;
  public copyPostMessage;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isError = false;
    this.message = "";
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.isUnauth = true;
      this.note = "please login !";
    }
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("postid");

      this.postService.getPostByPostId(this.postId).subscribe(
        (res) => {
          this.yourPost = false;
          this.postData = res.message[0];
          this.isDataFetch = true;

          if (!this.postData.take_book_id) {
            this.isBookNotAvailable = true;
            this.takeBook = "Book is not specified by user";
            this.takeBookAuthor = "Book author is not specified by user";
            this.note = "kindly reach out to user by clicking on chat button";
          }

          this.username = res.message[0].username;
          if (this.username == localStorage.getItem("username"))
            this.yourPost = true;
        },
        (err) => {}
      );
      this.profileId = localStorage.getItem("profileid");
      this.postService.getNearByPost(this.profileId, 0, 5).subscribe(
        (res) => {
          this.nearByPost = res.message;
          //
          // if (this.nearByPost.length == 0){
          //   this.isError=true;
          //   this.message=this.nearByPost.lenght+" post found"
          // }
          this.isNearByPostExist = true;
        },
        (err) => {}
      );
    });
  }
  openPost(postId, title) {
    //this.SharedService.KeepPostId(postId);
    this.router
      .navigateByUrl("/post", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`post/${postId}/${title.replace(/ /g, "_")}`]);
      });
  }
  editPost() {
    this.editPostId = this.postId;
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
        this.router.navigate([`updatepost/${this.postId}`]);
      });
  }
  deletePost() {
    let deletablePostData = {
      postId: this.postId,
      giveBookId: this.postData.give_book_id,
      takeBookId: this.postData.take_book_id,
    };
    this.postService.deletePost(deletablePostData).subscribe(
      (res) => {
        this.router.navigate([`/profile/${this.username}`]);
      },
      (err) => {}
    );
  }
  generateSharableLink(postId, title) {
    this.isShare = true;
    this.isCopy = false;
    this.copyPostMessage = "";
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
    console.log(this.chatPostId);
    this.isChatError = true;
    this.chatMessage =
      "This feature is currently under production. You can communicate with user via email and mobile number mentioned in profile page. click on the username mention in the post. Sorry for the inconvenience";

    setTimeout(() => {
      this.isChatError = false;
      this.chatMessage = "";
    }, 10000);
  }
}
