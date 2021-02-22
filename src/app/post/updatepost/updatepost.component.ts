import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";
import { SharedService } from "src/app/service/shared.service";
import * as _ from "lodash";

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
  selectedFile: File = null;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imageUploadNote;
  public isImageUploaded = false;
  public avatarUrl;
  public oldAvatar;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("postid");
      this.postService.getPostByPostId(this.postId).subscribe(
        (res) => {
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
          this.isDataFetch = true;

          if (!this.postData.take_book_id) {
            this.isBookNotAvailable = true;
            // this.takeBookName = "Book is not specified by user";
            // this.takeBookAuthor = "Book author is not specified by user";
            // this.note = "kindly reach out to user by clicking on chat button";
          }
        },
        (err) => {}
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
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = "Maximum size allowed is " + max_size / 1000 + "Mb";
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = "Only Images are allowed ( JPG | PNG )";
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  upload() {
    this.postService.uploadBookImage(this.cardImageBase64).subscribe(
      (res) => {
        this.isImageUploaded = true;
        this.imageUploadNote = "Image uploaded";
        this.avatarUrl = res.message.secure_url;
        this.bookImage = this.avatarUrl;
      },
      (err) => {
        this.imageUploadNote = "Failed Try Again ";
      }
    );
  }
  update() {
    this.postData = null;
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
        this.router
          .navigateByUrl("/post", { skipLocationChange: true })
          .then(() => {
            //this.router.navigate([`post/${this.postId}`]);
            this.router.navigate([`post/${this.postId}/${this.title}`]);
          });
      },
      (err) => {
        // console.log(err);
      }
    );
  }
}
