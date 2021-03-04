import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";
import { ProfileService } from "src/app/service/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public UrlUsername;
  public storesUsername;
  public username;
  public profileId;
  public postId;
  public location;
  public latitude;
  public longitude;
  public profileData;
  public email;
  public userId;
  public isPremium;
  public genreList;
  public points = 0;
  public postTitle;
  public PostDescription;
  public postData;
  public isPostExist = true;
  public message;
  public avatar;
  public title;
  public contact;
  public createdOn;
  public isUnauth;
  public isYourProfile;
  public contactVisibility = false;
  public isProfileAvailable = true;
  public savePostData;
  public isSavePostExist = false;
  public postMessage;
  public page = 1;
  public savePostPage = 1;
  public myPostPage = 1;
  public limit = 5;
  public offset = 1;
  public totalPages;
  public totalMyPost;
  public totalSavePost;
  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUnauth = localStorage.getItem("isUnauth");
    if (!this.isUnauth) {
      this.isUnauth = "true";
    }
    // console.log(this.isUnauth);

    this.storesUsername = localStorage.getItem("username");
    this.route.paramMap.subscribe((params) => {
      this.UrlUsername = params.get("username");
    });
    if (this.storesUsername === this.UrlUsername) {
      this.username = this.storesUsername;
      this.isYourProfile = true;
    } else {
      this.username = this.UrlUsername;
      this.isYourProfile = false;
    }
    if (!this.username) this.router.navigate(["login"]);
    this.profileService.getProfile(this.username).subscribe(
      (res) => {
        this.profileData = res.message[0];
        this.genreList = res.genrelist;
        this.profileId = this.profileData.id;
        this.location = this.profileData.location;
        this.latitude = this.profileData.latitude;
        this.longitude = this.profileData.longitude;
        this.email = this.profileData.email;
        this.userId = this.profileData.user_id;
        this.avatar = this.profileData.avatar;
        this.isPremium = this.profileData.premium;
        this.contact = this.profileData.contact;
        this.createdOn = this.profileData.created_on.substring(0, 10);
        this.contactVisibility = this.profileData.contact_visible;
        localStorage.setItem("userid", this.userId);
        localStorage.setItem("profileid", this.profileId);

        this.postService
          .getPostByProfile(this.profileId, 1, this.limit)
          .subscribe(
            (res) => {
              this.postData = res.message;
              this.totalMyPost = res.total;
              console.log(this.postData);
              console.log(res.total);
              this.isPostExist = true;
            },
            (err) => {
              if (!err.error.isPostExist) {
                this.isPostExist = false;
                this.postMessage = "You have not submited any post. ";
              }
            }
          );
        this.postService.getSavedPost(this.profileId).subscribe(
          (res) => {
            this.savePostData = res.message;
            this.isSavePostExist = true;
            this.totalSavePost = res.total;
            console.log(this.savePostData);
          },
          (err) => {
            if (!err.error.isPostExist) {
              this.isSavePostExist = false;
              this.message = "You have not saved any post. ";
            }
          }
        );
      },
      (err) => {
        if (err instanceof HttpErrorResponse)
          if (err.status === 401) {
            localStorage.setItem("isUnauth", "true");

            this.router.navigate(["/login"]);
          }
        this.isProfileAvailable = false;
      }
    );
  }
  openPost(postId) {
    this.title = this.postData[0].title;
    this.router.navigate([`post/${postId}/${this.title.replace(/ /g, "_")}`]);
  }

  EditProfile() {
    this.router
      .navigateByUrl("updateProfile", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([
          `updateprofile/${this.profileId}/${this.username.replace(/ /g, "_")}`,
        ]);
      });
  }

  deleteProfile() {
    this.router
      .navigateByUrl("deleteprofile", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([
          `deleteprofile/${this.userId}/${this.username.replace(/ /g, "_")}`,
        ]);
      });
  }
  UnsavePost(postId) {
    console.log(postId);
    let unSavePostData = {
      post_id: postId,
      profile_id: this.profileId,
    };
    this.postService.unSavePost(unSavePostData).subscribe(
      (res) => {
        console.log(res);
        this.router
          .navigateByUrl("/profile", { skipLocationChange: true })
          .then(() => {
            this.router.navigate([`profile/${this.username}`]);
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPostByProfile(page) {
    if (page) this.offset = (page - 1) * this.limit;
    else this.offset = 1;
    console.log(this.offset);

    this.postService
      .getPostByProfile(this.profileId, this.offset, this.limit)
      .subscribe(
        (res) => {
          this.postData = res.message;
          this.totalMyPost = res.total;
          this.isPostExist = true;
        },
        (err) => {
          if (!err.error.isPostExist) {
            this.isPostExist = false;
            this.postMessage = "You have not submited any post. ";
          }
        }
      );
  }
  getSavePost(page) {
    if (page) this.offset = (page - 1) * this.limit;
    else this.offset = 1;

    this.postService.getSavedPost(this.profileId).subscribe(
      (res) => {
        this.savePostData = res.message;
        this.totalSavePost = res.total;
        this.isSavePostExist = true;
        console.log(this.savePostData);
      },
      (err) => {
        if (!err.error.isPostExist) {
          this.isSavePostExist = false;
          this.message = "You have not saved any post. ";
        }
      }
    );
  }
  getPageForMyPost(page) {
    this.myPostPage = page;
    console.log(page);
    this.getPostByProfile(this.myPostPage);
  }
  getPageforSavedPost(page) {
    this.savePostPage = page;
    console.log(page);
    this.getSavePost(this.savePostPage);
  }
}
