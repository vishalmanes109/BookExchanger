import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/service/post.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import * as _ from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-createpost",
  templateUrl: "./createpost.component.html",
  styleUrls: ["./createpost.component.css"],
})
export class CreatepostComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
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
  public bookGenreList = new Array();
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.dropdownList = [
      { id: 1, text: "Adult Fiction" },
      { id: 2, text: "Epic Fantasy" },
      { id: 3, text: "Horror" },
      { id: 4, text: "Fiction" },
      { id: 5, text: "Fantasy" },
      { id: 6, text: "Historical Fiction" },
      { id: 7, text: "Mystery" },
      { id: 8, text: "Politics" },
      { id: 9, text: "Science Fiction" },
      { id: 10, text: "Thriller" },
      { id: 11, text: "War" },
      { id: 12, text: "Art" },
      { id: 13, text: "Biography" },
      { id: 14, text: "Business" },
      { id: 15, text: "Classics" },
      { id: 16, text: "Comics" },
      { id: 17, text: "Contemporary" },
      { id: 18, text: "Cookbooks" },
      { id: 19, text: "Crime" },
      { id: 20, text: "History" },
      { id: 21, text: "Humor and Comedy" },
      { id: 22, text: "Manga" },
      { id: 23, text: "Memoir" },
      { id: 24, text: "Nonfiction" },
      { id: 25, text: "Paranormal" },
      { id: 26, text: "Philosophy" },
      { id: 27, text: "Poetry" },
      { id: 28, text: "Psychology" },
      { id: 29, text: "Religion" },
      { id: 30, text: "Romance" },
      { id: 31, text: "Science" },
      { id: 32, text: "Self Help" },
      { id: 33, text: "Suspense" },
      { id: 34, text: "Spirituality" },
      { id: 35, text: "Sports" },
      { id: 36, text: "Travel" },
      { id: 37, text: "Young Adult" },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      itemsShowLimit: 5,
      allowSearchFilter: true,
      limitSelection: 5,
      enableCheckAll: false,
      noDataAvailablePlaceholderText: "No data available",
    };
  }
  onItemSelect(item: any) {
    this.bookGenreList.push(item.id);
  }
  onSelectAll(items: any) {}
  onItemDeSelect(item: any) {
    const index: number = this.bookGenreList.indexOf(item.id);
    if (index !== -1) {
      this.bookGenreList.splice(index, 1);
    }
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
      book_genre_list: this.bookGenreList,
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
    if (this.bookGenreList.length < 2) {
      this.isError = true;
      this.message = "Please select atleast 2 genres";
      return;
    }
    if (this.bookGenreList.length > 5) {
      this.isError = true;
      this.message = "Please select maximun of 5 genres";
      return;
    }

    this.postService.addPost(postData).subscribe(
      (res) => {
        this.isDone = true;
        this.isError = false;
        this.message = "Post added succesfully";
        let postId = res.post_id;
        // this.router.navigate([`post/${postId}`]);
        this.router.navigate([
          `post/${postId}/${this.title.replace(/ /g, "_")}`,
        ]);
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
    this.selectedItems = [];
    this.bookGenreList.length = 0;
  }
  onBlur() {
    this.message = "";
    this.isError = false;
  }
}
