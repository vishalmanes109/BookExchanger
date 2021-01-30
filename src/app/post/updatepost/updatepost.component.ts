import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-updatepost",
  templateUrl: "./updatepost.component.html",
  styleUrls: ["./updatepost.component.css"],
})
export class UpdatepostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private SharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public postId;
  public postData;
  public yourPost = false;
  public isDataFetch = false;
  public isBookNotFound = false;
  public isBookNotAvailable = false;
  public note;
  public bookImage;
  public takeBook;
  public title;
  public giveBookAuthor;
  public description;
  public giveBookName;
  public username;
  public isError;
  public message;
  public takeBookName;
  public takeBookAuthor;
  public give_book_id;
  public take_book_id;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("postid");
      //console.log("lol", this.postId);
      this.postService.getPostByPostId(this.postId).subscribe(
        (res) => {
          //console.log("from post:", res);
          this.postData = res.message[0];
          this.postId = this.postData.postid;
          this.title = this.postData.title;
          this.description = this.postData.description;
          this.giveBookName = this.postData.givebookname;
          this.giveBookAuthor = this.postData.givebookauthor;
          this.bookImage = this.postData.give_book_image;
          this.takeBookName = this.postData.takebookname;
          this.takeBookAuthor = this.postData.takebookauthor;
          this.give_book_id = this.postData.give_book_id;
          this.take_book_id = this.postData.take_book_id;
          console.log("from update:", this.postData);
          this.isDataFetch = true;

          if (!this.postData.take_book_id) {
            this.isBookNotAvailable = true;
            // this.takeBookName = "Book is not specified by user";
            // this.takeBookAuthor = "Book author is not specified by user";
            // this.note = "kindly reach out to user by clicking on chat button";
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  discard() {
    this.title = "";
    this.description = "";
    this.giveBookAuthor = "";
    this.giveBookName = "";
    this.takeBookAuthor = "";
    this.takeBookName = "";
  }
  update() {
    this.postData=null;
    this.username = localStorage.getItem("username");
    let updatePostData = {
      postid: this.postId,
      title: this.title,
      description: this.description,
      give_book_image: this.bookImage,
      give_book_name: this.giveBookName,
      give_book_author: this.giveBookAuthor,
      take_book_author: this.takeBookAuthor,
      take_book_name: this.takeBookName,
      give_book_id: this.give_book_id,
      take_book_id: this.take_book_id,
      username: this.username,
    };
    console.log("updatePostData", updatePostData);

    if (
      !this.title ||
      !this.description ||
      !this.giveBookName ||
      !this.giveBookAuthor ||
      !this.bookImage
    ) {
      this.isError = true;
      this.message = "Please Fill all mendatory details";
      return;
    }
    if (this.description.length > 140) {
      this.isError = true;
      this.message = "Maximun 140 characters allowed in description";
      return;
    }
    this.postService.updatePost(updatePostData).subscribe(
      (res) => {
        console.log(res)
        console.log("data updated");
        this.router
          .navigateByUrl("/post", { skipLocationChange: true })
          .then(() => {
            this.router.navigate([`post/${this.postId}`]);
          });
      },
      (err) => {
        console.log(err)
       // console.log("error while updating");
      }
    );
  }
}
