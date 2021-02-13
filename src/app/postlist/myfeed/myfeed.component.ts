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
  public isUnauth;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    //console.log(this.sortBy);

    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.isUnauth = true;

      this.note =
        "please login in order to access nearby post and your post. However you can access advance search and search by book without login";
    } else {
      this.note =
        "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";

      this.isNearByPost = true;
      this.profileId = localStorage.getItem("profileid");
      // console.log(this.profileId);
      this.yourPost = false;
      this.isUnauth = false;

      this.postService.getNearByPost(this.profileId).subscribe(
        async (res) => {
          //  console.log(res.message);
          this.postData = res.message;
          this.isDataFetch = true;
          this.note = this.postData.length + " Post/s found";

          // console.log(this.postData);
        },
        (err) => {
          this.note =
            "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";

          console.log(err);
        }
      );
    }
  }
  myFeedByLocation() {
    // this.sortBy = "location";
    this.isNearByPost = true;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = false;
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.note =
        "please login in order to access nearby post and your post. However you can access advance search and search post by book and new post without login";
    } else {
      //console.log(this.sortBy);
      this.profileId = localStorage.getItem("profileid");
      // console.log(this.profileId);
      this.postService.getNearByPost(this.profileId).subscribe(
        (res) => {
          //  console.log(res.message);
          this.postData = res.message;
          this.isDataFetch = true;
          this.note = this.postData.length + " Post/s found";

          // console.log(this.postData);
        },
        (err) => {
          console.log(err);
        }
      );
      // this.router.navigate(["/profile"]);
      // this.router.navigate(["/myfeed"]);
    }
  }
  myFeedByMyPost() {
    // this.sortBy = "mypost";
    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = true;
    if (
      localStorage.getItem("isUnauth") == "true" ||
      !localStorage.getItem("isUnauth")
    ) {
      this.note =
        "please login in order to access nearby post and your post. However you can access advance search and search post by book and new post without login";
    } else {
      //console.log(this.sortBy);
      // this.router.navigate(["/profile"]);
      // this.router.navigate(["/myfeed"]);
      this.postService.getPostByProfile(this.profileId).subscribe(
        (res) => {
          // console.log(res);
          // console.log(this.sortBy);
          this.postData = res.message;
          this.isDataFetch = true;
          this.note = this.postData.length + " Post/s found";
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  myFeedByNewPost() {
    // this.sortBy = "newpost";
    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;
    this.yourPost = false;

    //console.log(this.sortBy);
    // this.router.navigate(["/myfeed"]);
    this.postService.getAllPost().subscribe(
      (res) => {
        // console.log(res);
        // console.log(this.sortBy);
        this.isDataFetch = true;
        this.postData = res.message;
        this.note = this.postData.length + " Post/s found";
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPostByBookName() {
    this.isNearByPost = false;
    this.yourPost = false;

    if (this.bookname && this.bookname.length > 0) {
      console.log(this.bookname);
      this.postService.getPostByBookName(this.bookname).subscribe(
        (res) => {
          console.log(res);
          this.isDataFetch = true;
          this.postData = res.message;
          this.note = this.postData.length + " Post/s found";
        },
        (err) => {
          this.isDataFetch = false;
          this.postData = null;
          //console.log(err);
        }
      );
    }
  }
  editPost(postId) {
    console.log(postId);
    this.router
      .navigateByUrl("/updatepost", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`updatepost/${postId}`]);
      });
  }
  deletePost(postId) {
    let deletablePostData = {
      postId: postId,
      giveBookId: this.postData.give_book_id,
      takeBookId: this.postData.take_book_id,
    };
    console.log(deletablePostData);
    this.postService.deletePost(deletablePostData).subscribe(
      (res) => {
        console.log("deleted");
        this.router.navigate(["/profile"]);
      },
      (err) => {
        console.log("error: Post does not exist");
      }
    );
  }
}
