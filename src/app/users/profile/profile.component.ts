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

  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private SharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    //console.log(this.username);
    if (!this.username) this.router.navigate(["login"]);
    this.profileService.getProfile(this.username).subscribe(
      (res) => {
        //console.log(res);
        this.profileData = res.message[0];
        this.genreList = res.genrelist;
        console.log(this.profileData);
        console.log(this.genreList);
        this.profileId = this.profileData.id;
        this.location = this.profileData.location;
        this.latitude = this.profileData.latitude;
        this.longitude = this.profileData.longitude;
        this.email = this.profileData.email;
        this.userId = this.profileData.user_id;
        this.isPremium = this.profileData.premium;
        localStorage.setItem("userid", this.userId);
        localStorage.setItem("profileid", this.profileId);

        this.postService.getPostByProfile(this.profileId).subscribe(
          (res) => {
            //console.log(res);
            this.postData = res.message;
            //console.log(this.postData);
            this.isPostExist = true;
          },
          (err) => {
            if (!err.error.isPostExist) {
              this.isPostExist = false;
              this.message = "You have not submited any post. ";
            }
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openPost(postId) {
    // this.SharedService.KeepPostId(postId);
    console.log(`post/${postId}`);
    this.router.navigate([`post/${postId}`]);
  }

  EditProfile() {
    // console.log(this.username);
    // this.ProfileService.getProfile(this.username).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  deleteProfile() {
    console.log(this.profileId);
    console.log(this.username);
    console.log(this.userId);
    console.log(`deleteprofile/${this.userId}`);
    this.router
      .navigateByUrl("deleteprofile", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`deleteprofile/${this.userId}`]);
      });
  }
}
