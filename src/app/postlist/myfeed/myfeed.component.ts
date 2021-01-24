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
  public nearByPost;
  public isDataFetch = false;
  public isBookNotFound = false;
  public giveBook;
  public takeBook;
  public takeBookAuthor;
  public giveBookAuthor;
  public isBookNotAvailable = false;
  public note;
  public entirePostData;
  public takeBookData;
  public takeBookId;
  private i;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.profileId = localStorage.getItem("profileid");
    // console.log(this.profileId);
    this.postService.getNearByPost(this.profileId).subscribe(
      (res) => {
        console.log(res.message);
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

        console.log(this.nearByPost.length);
        for (this.i = 0; this.i < this.nearByPost.length; this.i++) {
          //console.log("ji")
          if (this.nearByPost[this.i].take_book_id) {
            //console.log("Hi");
            //console.log(this.nearByPost[i].take_book_id);
            this.postService
              .getTakeBook(this.nearByPost[this.i].take_book_id)
              .subscribe(
                (res) => {
                  console.log(this.i);
                  console.log(res.message[this.i]);
                  // this.takeBookId = res.message[i].id;
                  // this.takeBook = res.message[i].name;
                  // this.takeBookAuthor = res.message[i].author;
                  this.note =
                    "kindly reach out to user by clicking on chat button";
                 // this.entirePostData.takeBookAuthor = res.message[0].name;

                 // this.entirePostData.takeBookAuthor = res.message[0].author;
                  console.log("after:", this.entirePostData);
                  this.takeBookData = {
                    takeBookId: res.message[this.i].id,
                    takeBookName: res.message[this.i].name,
                    takeBookAuthor: res.message[this.i].author,
                  };

                },
                (err) => {
                  console.log(err);
                  this.isBookNotFound = true;
                  this.takeBook = "Error while parsing book please try again";
                  this.takeBookAuthor =
                    "Error while parsing book please try again";
                  this.note =
                    "kindly reach out to user by clicking on chat button";
                }
              );
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
