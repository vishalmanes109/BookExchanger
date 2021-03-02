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

        this.postService.getPostByProfile(this.profileId).subscribe(
          (res) => {
            this.postData = res.message;

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
            console.log(res);
            this.savePostData = res.message;
            this.isSavePostExist = true;
            console.log(this.savePostData);
          },
          (err) => {
            console.log(err);
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
}
