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
  public loadingStart = false;
  //public sortBy = "location";
  public takeBookResult;
  public page = 1;
  public limit = 5;
  public offset = 1;
  public totalPages;
  public shareLink;
  public isCopy = false;
  public isShare = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.note = "";
  }

  changeByBook() {
    this.byBook = !this.byBook;
    if (this.byBook == true) this.counter++;
    else this.counter--;
  }
  changeByAuthor() {
    this.byAuthor = !this.byAuthor;
    if (this.byAuthor == true) this.counter++;
    else this.counter--;
  }
  changeByTitle() {
    this.byTitle = !this.byTitle;
    if (this.byTitle == true) this.counter++;
    else this.counter--;
  }
  changeByLocation() {
    this.byLocation = !this.byLocation;
    if (this.byLocation == true) this.counter++;
    else this.counter--;
  }
  changeByUser() {
    this.byUser = !this.byUser;
    if (this.byUser == true) this.counter++;
    else this.counter--;
  }
  generateSharableLink(postId, title) {
    this.isShare = true;
    this.isCopy = false;

    this.shareLink = `http://localhost:4200/post/${postId}/${title.replace(
      / /g,
      "_"
    )}`;
  }
  copyShareableLink(link) {
    let copyBox = document.createElement("textarea");
    copyBox.style.position = "fixed";
    copyBox.style.left = "0";
    copyBox.style.top = "0";
    copyBox.style.opacity = "0";
    copyBox.value = link;
    document.body.appendChild(copyBox);
    copyBox.focus();
    copyBox.select();
    document.execCommand("copy");
    document.body.removeChild(copyBox);
    this.isCopy = true;
  }

  getNextPage(page) {
    this.page = page;
    this.searchPost(this.page);
  }

  searchPost(page) {
    this.isError = false;
    this.postData = null;
    this.isDataFetch = false;
    if (page) this.offset = (page - 1) * this.limit;
    if (!page) this.offset = 0;

    if (this.counter > 1) {
      this.note = "";

      this.isError = true;
      this.message = "Select Only ONE of the above parameter";
      return;
    }
    if (this.counter == 0) {
      this.note = "";

      this.isError = true;
      this.message = "Select Atleast ONE of the above parameter ";
      return;
    }
    if (!this.isError) {
      if (this.byBook) {
        this.loadingStart = true;
        this.postService
          .getPostByBookName(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";
              this.loadingStart = false;

              return;
            },
            (err) => {
              this.isDataFetch = false;
              this.loadingStart = false;

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
        this.postService
          .getPostByUser(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";

              return;
            },
            (err) => {
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
        this.postService
          .getPostByTitle(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;
              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";

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
        this.postService.getPostByLocation(this.text,this.offset,this.limit).subscribe(
          (res) => {
            this.isDataFetch = true;
            this.postData = res.message;
            this.totalPages = res.total;
            this.note = this.totalPages + " Post/s found";

            return;
          },
          (err) => {
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
      if (this.byAuthor) {
        this.postService
          .getPostByAuthor(this.text, this.offset, this.limit)
          .subscribe(
            (res) => {
              this.isDataFetch = true;

              this.postData = res.message;
              this.totalPages = res.total;
              this.note = this.totalPages + " Post/s found";

              return;
            },
            (err) => {
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
  }
}
