import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/service/post.service";

@Component({
  selector: "app-advancesearch",
  templateUrl: "./advancesearch.component.html",
  styleUrls: ["./advancesearch.component.css"],
})
export class AdvancesearchComponent implements OnInit {
  public byBook = false;
  public byTitle = false;
  public byAuthor = false;
  public byLocation = false;
  public byUser = false;
  public isError = false;
  private counter = 0;
  public message;
  public text;
  public postData;
  public isDataFetch = false;
  public profileId;
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
  public bookname;
  //public sortBy = "location";
  public takeBookResult;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  changeByBook() {
    this.byBook = !this.byBook;
    console.log(this.byBook);
    if (this.byBook == true) this.counter++;
    else this.counter--;
    console.log(this.counter);
  }
  changeByAuthor() {
    this.byAuthor = !this.byAuthor;
    console.log(this.byAuthor);
    if (this.byAuthor == true) this.counter++;
    else this.counter--;
    console.log(this.counter);
  }
  changeByTitle() {
    this.byTitle = !this.byTitle;
    console.log(this.byTitle);
    if (this.byTitle == true) this.counter++;
    else this.counter--;
    console.log(this.counter);
  }
  changeByLocation() {
    this.byLocation = !this.byLocation;
    console.log(this.byLocation);
    if (this.byLocation == true) this.counter++;
    else this.counter--;
    console.log(this.counter);
  }
  changeByUser() {
    this.byUser = !this.byUser;
    console.log(this.byUser);
    if (this.byUser == true) this.counter++;
    else this.counter--;
    console.log(this.counter);
  }

  searchPost() {
    this.isError = false;
    this.postData = null;
    if (this.counter > 1) {
      this.isError = true;
      this.message = "Select Only ONE of the above parameter";
      return;
    }
    if (this.counter == 0) {
      this.isError = true;
      this.message = "Select Atleast ONE of the above parameter ";
      return;
    }
    if (!this.isError) {
      if (this.byBook) {
        this.postService.getPostByBookName(this.text).subscribe(
          (res) => {
            console.log(res);
            this.isDataFetch = true;
            this.postData = res.message;
            this.note = this.postData.length + " Post/s found";

            return;
          },
          (err) => {
            this.isDataFetch = false;

            console.log(err);
            if (err.error.message != "Post does not exis") {
              this.isError = true;
              this.message =
                "0 Post found for corrosponding search, Try different keywords, check for spellings";
              return;
            }
            this.isError = true;
            this.message = "Error while fetching data please try again ";
          }
        );
      }
      if (this.byUser) {
        this.postService.getPostByUser(this.text).subscribe(
          (res) => {
            console.log(res);

            this.isDataFetch = true;
            this.postData = res.message;
            this.note = this.postData.length + " Post/s found";

            return;
          },
          (err) => {
            console.log(err);
            this.isDataFetch = false;

            if (err.error.message != "Post does not exis") {
              this.isError = true;
              this.message =
                "0 Post found for corrosponding search, Try different keywords, check for spellings";
              return;
            }
            this.isError = true;
            this.message = "Error while fetching data please try again ";
          }
        );
      }
      if (this.byTitle) {
        this.postService.getPostByTitle(this.text).subscribe(
          (res) => {
            console.log(res);

            this.isDataFetch = true;
            this.postData = res.message;
            this.note = this.postData.length + " Post/s found";

            return;
          },
          (err) => {
            this.isDataFetch = false;

            console.log(err);
            if (err.error.message != "Post does not exis") {
              this.isError = true;
              this.message =
                "0 Post found for corrosponding search, Try different keywords, check for spellings";
              return;
            }
            this.isError = true;
            this.message = "Error while fetching data please try again ";
          }
        );
      }
      if (this.byLocation) {
        this.postService.getPostByLocation(this.text).subscribe(
          (res) => {
            console.log(res);

            this.isDataFetch = true;
            this.postData = res.message;
            this.note = this.postData.length + " Post/s found";

            return;
          },
          (err) => {
            this.isDataFetch = false;

            console.log(err);
            if (err.error.message != "Post does not exis") {
              this.isError = true;
              this.message =
                "0 Post found for corrosponding search, Try different keywords, check for spellings";
              return;
            }
            this.isError = true;
            this.message = "Error while fetching data please try again ";
          }
        );
      }
      if (this.byAuthor) {
        this.postService.getPostByAuthor(this.text).subscribe(
          (res) => {
            console.log(res);

            this.isDataFetch = true;

            this.postData = res.message;
            this.note = this.postData.length + " Post/s found";

            return;
          },
          (err) => {
            console.log(err);
            this.isDataFetch = false;

            if (err.error.message != "Post does not exis") {
              this.isError = true;
              this.message =
                "0 Post found for corrosponding search, Try different keywords, check for spellings";
              return;
            }
            this.isError = true;
            this.message = "Error while fetching data please try again ";
          }
        );
      }
    }

    console.log(this.byBook);
    console.log(this.byAuthor);

    console.log(this.byTitle);

    console.log(this.byLocation);

    console.log(this.byUser);
  }
}

// 14th ravivar

// Vishal mane
// abhishek naik
// suresh jaiswar
// ganesh patil
// shivprasda
// akshay jadhav sanpada
// yashpal
