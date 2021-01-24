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
        //  this.entirePostData = {
        //   username: this.nearByPost.name,
        //   title: this.nearByPost.title,
        //   description: this.nearByPost.description,
        //   date: this.nearByPost.post_time,
        //   distace: this.nearByPost.distance,
        //   profileId: this.nearByPost.profileid,
        //   postId: this.nearByPost.postid,
        //   giveBook: this.nearByPost.givebookname,
        //   giveBookAuthor: this.nearByPost.givebookauthor,
        //   takeBook: null,
        //   takeBookAuthor: null,
        // };
        // this.entirePostData = {
        //   rawData: this.nearByPost,
        //   giveBook: null,
        //   giveBookAuthor: null,
        //   takeBook: null,
        //   takeBookAuthor: null,
        // };
        //console.log("before:", this.entirePostData);

        //console.log(this.nearByPost.length);
        this.entirePostData = {
          username: this.nearByPost.name,
          title: this.nearByPost.title,
          description: this.nearByPost.description,
          date: this.nearByPost.post_time,
          distace: this.nearByPost.distance,
          profileId: this.nearByPost.profileid,
          postId: this.nearByPost.postid,
          giveBook: this.nearByPost.givebookname,
          giveBookAuthor: this.nearByPost.givebookauthor,
          takeBook: null,
          takeBookAuthor: null,
        };
        for (this.i = 0; this.i < this.nearByPost.length; this.i++) {
          //console.log("ji")
          if (this.nearByPost[this.i].take_book_id) {
            //console.log("Hi");
            // console.log(this.nearByPost[this.i].take_book_id);

            await this.takeBookData.push(
              this.postService.getTakeBook(this.nearByPost[this.i].take_book_id)
            );
            forkJoin(this.takeBookData).subscribe(
              async (res) => {
                //console.log("res lol",res);
                this.takeBookResult = res;
                console.log(this.takeBookResult);
                // for (let j = 0; j < this.nearByPost.length; j++) {
                //   this.k = 0;

                //   if (
                //     this.k < this.takeBookResult.length &&
                //     this.nearByPost[j].take_book_id ==
                //       this.takeBookResult[this.k].message[0].id
                //   ) {
                //     console.log(
                //       this.takeBookResult[this.k].message[0],
                //       this.nearByPost[j]
                //     );
                //     this.entirePostData.takeBook = this.takeBookResult[
                //       this.k
                //     ].message[0];

                //     this.k++;
                //   }
                // }
              },
              (err) => console.log(err)
            );
            await console.log(this.takeBookResult);
          } else {
            this.isBookNotAvailable = true;
            this.takeBook = "Book is not specified by user";
            this.takeBookAuthor = "Book author is not specified by user";
            this.note = "kindly reach out to user by clicking on chat button";
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
