import { ApplicationRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";
import { SharedService } from "src/app/service/shared.service";

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
  public message;

  constructor(
    private postService: PostService,
    private SharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit():  void {
    this.isError = false;
    this.message = "";
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("postid");
    });
    this.postService.getPostByPostId(this.postId).subscribe(
      (res) => {
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
    this.postService.getNearByPost(this.profileId).subscribe(
      (res) => {
        this.nearByPost = res.message;
        // if (this.nearByPost.length == 0){
        //   this.isError=true;
        //   this.message=this.nearByPost.lenght+" post found"
        // }
        this.isNearByPostExist = true;
      },
      (err) => {}
    );
  }
  openPost(postId) {
    //this.SharedService.KeepPostId(postId);
    this.router
      .navigateByUrl("/post", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`post/${postId}`]);
      });
  }
  editPost() {
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
        this.router.navigate(["/profile"]);
      },
      (err) => {}
    );
  }
}
