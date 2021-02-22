import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/service/post.service";
import * as _ from "lodash";
import { Router } from "@angular/router";

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
  selectedFile: File = null;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imageUploadNote;
  public isImageUploaded = false;
  public avatarUrl;
  constructor(private postService: PostService, private router:Router) {}

  ngOnInit(): void {}
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
        this.imageUploadNote = "Book Image uploaded";
        this.bookImage = res.message.secure_url;
      },
      (err) => {
        this.imageUploadNote = "Failed Try Again ";
      }
    );
  }
  addPost() {
    this.username = localStorage.getItem("username");
    let postData = {
      title: this.title,
      description: this.description,
      give_book_image: this.bookImage,
      give_book_name: this.giveBookName,
      give_book_author: this.giveBookAuthor,
      take_book_name: this.takeBookName,
      take_book_author: this.takeBookAuthor,
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

    this.postService.addPost(postData).subscribe(
      (res) => {
        this.isDone = true;
        this.isError = false;
        this.message = "Post added succesfully";
        let postId=res.post_id
       // this.router.navigate([`post/${postId}`]);
        this.router.navigate([`post/${postId}/${this.title}`]);


      },
      (err) => {
        this.isError = true;
        this.isDone = false;
        this.message = "Post failed! Try again ";
      }
    );
  }
  discardPost() {
    this.title = "";
    this.description = "";
    this.giveBookName = "";
    this.giveBookName = "";
    this.takeBookAuthor = "";
    this.takeBookName = "";
    this.giveBookAuthor = "";
    this.giveBookName = "";
    this.bookImage = null;
    this.message = "";
    this.isError = false;
  }
  onBlur() {
    this.message = "";
    this.isError = false;
  }
}
