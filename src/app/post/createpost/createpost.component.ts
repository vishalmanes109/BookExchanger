import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "app-createpost",
  templateUrl: "./createpost.component.html",
  styleUrls: ["./createpost.component.css"],
})
export class CreatepostComponent implements OnInit {
  public title;
  public description;
  public giveBookName;
  public takeBookName;
  public giveBookAuthor;
  public takeBookAuthor;
  public isError = false;
  public isDone = false;
  public message;
  public bookImage;
  private username;
  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  addPost() {
    this.username=localStorage.getItem('username')
    let postData = {
      title: this.title,
      description: this.description,
      give_book_image: this.bookImage,
      give_book_name: this.giveBookName,
      give_book_author: this.giveBookName,
      take_book_name: this.takeBookName,
      take_book_author: this.takeBookAuthor,
      username:this.username
    };

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
    console.log(postData)

    this.postService.addPost(postData).subscribe(
      (res) => {
        console.log(res);
        this.isDone = true;
        this.isError = false;
      },
      (err) => {
        this.isError = true;
        this.isDone = false;
        this.message="Post failed! Try again "
        console.log(err);
      }
    );
  }
  discardPost() {
    console.log("lol");
    this.title = "";
    this.description = "";
    this.giveBookName = "";
    this.giveBookName = "";
    this.takeBookAuthor = "";
    this.giveBookName = "";
    this.bookImage = null;
    this.message = "";
    this.isError = false;
  }
  onBlur() {
    this.message=""
    this.isError=false;
  }
}
