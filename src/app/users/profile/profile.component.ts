import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/service/post.service";
import { ProfileService } from "src/app/service/profile.service";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
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

  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private SharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    if (!this.username) this.router.navigate(["login"]);
    this.profileService.getProfile(this.username).subscribe(
      (res) => {
        localStorage.setItem("isUnauth", "false");
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
        this.createdOn = this.profileData.created_on.substring(0,10);
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
              this.message = "You have not submited any post. ";
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
      }
    );
  }
  openPost(postId) {
    this.title = this.postData[0].title;
    // this.router.navigate([
    //   "post",
    //   { postid: postId, slug: this.title },
    // ]);
    this.router.navigate([`post/${postId}/${this.title}`]);
  }

  EditProfile() {
    this.router
      .navigateByUrl("updateProfile", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`updateprofile/${this.profileId}`]);
      });
  }

  deleteProfile() {
    this.router
      .navigateByUrl("deleteprofile", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`deleteprofile/${this.userId}`]);
      });
  }
}
