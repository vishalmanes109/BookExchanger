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
  //public sortBy = "location";
  public takeBookResult;
  public isNearByPost = false;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    //console.log(this.sortBy);
    this.note =
      "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";
          
    this.isNearByPost = true;
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);

    if (!this.profileId) this.router.navigate(["login"]);
    this.postService.getNearByPost(this.profileId).subscribe(
      async (res) => {
        //  console.log(res.message);
        this.postData = res.message;
        this.isDataFetch = true;
        // console.log(this.postData);
      },
      (err) => {
        this.note =
          "0 post found for corresponding result, Please invite your family, friends on bookXchanger to get much more benefits from priceless service.";

        console.log(err);
      }
    );
  }
  myFeedByLocation() {
    // this.sortBy = "location";
    this.isNearByPost = true;
    this.isDataFetch = false;
    this.postData = null;
    //console.log(this.sortBy);
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);
    if (!this.profileId) this.router.navigate(["login"]);
    this.postService.getNearByPost(this.profileId).subscribe(
      (res) => {
        //  console.log(res.message);
        this.postData = res.message;
        this.isDataFetch = true;
        // console.log(this.postData);
      },
      (err) => {

        console.log(err);
      }
    );
    // this.router.navigate(["/profile"]);
    // this.router.navigate(["/myfeed"]);
  }
  myFeedByMyPost() {
    // this.sortBy = "mypost";
    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;
    //console.log(this.sortBy);
    // this.router.navigate(["/profile"]);
    // this.router.navigate(["/myfeed"]);
    if (!this.profileId) this.router.navigate(["login"]);
    this.postService.getPostByProfile(this.profileId).subscribe(
      (res) => {
        // console.log(res);
        // console.log(this.sortBy);
        this.postData = res.message;
        this.isDataFetch = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  myFeedByNewPost() {
    // this.sortBy = "newpost";
    this.isNearByPost = false;
    this.isDataFetch = false;
    this.postData = null;

    //console.log(this.sortBy);
    // this.router.navigate(["/myfeed"]);
    if (!this.profileId) this.router.navigate(["login"]);
    this.postService.getAllPost().subscribe(
      (res) => {
        // console.log(res);
        // console.log(this.sortBy);
        this.isDataFetch = true;
        this.postData = res.message;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPostByBookName() {
    this.isNearByPost = false;
    if (this.bookname && this.bookname.length > 0) {
      console.log(this.bookname);
      this.postService.getPostByBookName(this.bookname).subscribe(
        (res) => {
          console.log(res);
          this.isDataFetch = true;
          this.postData = res.message;
        },
        (err) => {
          this.isDataFetch = false;
          this.postData = null;
          //console.log(err);
        }
      );
    }
  }
}
