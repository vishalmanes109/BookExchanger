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
  //public sortBy = "location";
  public takeBookResult;
  public isNearByPost = false;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    //console.log(this.sortBy);
    this.isNearByPost = true;
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);
    this.postService.getNearByPost(this.profileId).subscribe(
      async (res) => {
        //  console.log(res.message);
        this.postData = res.message;
        this.isDataFetch = true;
        // console.log(this.postData);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  myFeedByLocation() {
    // this.sortBy = "location";
    this.isNearByPost = true;
    //console.log(this.sortBy);
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);
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
    //console.log(this.sortBy);
    // this.router.navigate(["/profile"]);
    // this.router.navigate(["/myfeed"]);
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
    //console.log(this.sortBy);

    // this.router.navigate(["/myfeed"]);
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
}
