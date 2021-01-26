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

  constructor(
    private postService: PostService,
    private SharedService: SharedService,
    private route: ActivatedRoute,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("postid");
      // console.log("lol", this.postId);
    });
    //console.log("outof", this.postId);
    this.postService.getPostByPostId(this.postId).subscribe(
      (res) => {
          console.log("from post:", res);
        this.postData = res.message[0];
         console.log("from post:", this.postData);
        this.isDataFetch = true;
       
        if (! this.postData.take_book_id) {
           this.isBookNotAvailable = true;
           this.takeBook = "Book is not specified by user";
           this.takeBookAuthor = "Book author is not specified by user";
           this.note = "kindly reach out to user by clicking on chat button";
        
        } 

        this.username = res.message[0].username;
        if (this.username == localStorage.getItem("username"))
          this.yourPost = true;
      },
      (err) => {
        console.log(err);
      }
    );

    // get post related to that users location

    this.profileId = localStorage.getItem("profileid");
    console.log("profile:",this.profileId);
    this.postService.getNearByPost(this.profileId).subscribe(
      (res) => {
       // console.log(res.message);
        this.nearByPost = res.message;
        this.isNearByPostExist=true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
    openPost(postId) {
    //this.SharedService.KeepPostId(postId);
    console.log(`post/${postId}`);
    this.router.navigateByUrl('/post', { skipLocationChange: true }).then(() => {
    this.router.navigate([`post/${postId}`]);
});
    }
        editPost(){
          console.log(this.postId)
           this.router
             .navigateByUrl("/updatepost", { skipLocationChange: true })
             .then(() => {
               this.router.navigate([`updatepost/${this.postId}`]);
             });
        }
        deletePost(){
          let deletablePostData={
            postId:this.postId,
            giveBookId:this.postData.give_book_id,
            takeBookId:this.postData.take_book_id
          }
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
