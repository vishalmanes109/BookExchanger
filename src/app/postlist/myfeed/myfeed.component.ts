import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { PostService } from "src/app/service/post.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-myfeed",
  templateUrl: "./myfeed.component.html",
  styleUrls: ["./myfeed.component.css"],
})
export class MyfeedComponent implements OnInit {
  public profileId;
  public nearByPost;
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
  private i;
  private k;
  public takeBookResult;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);
    this.postService.getNearByPost(this.profileId).subscribe(
      async (res) => {
        //  console.log(res.message);
        this.nearByPost = res.message;
        this.isDataFetch = true;
        console.log(this.nearByPost);
      },
      (err) => {
        
        console.log(err);
      }
    );
  }
}
