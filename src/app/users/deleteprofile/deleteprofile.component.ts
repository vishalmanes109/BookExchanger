import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "src/app/service/profile.service";

@Component({
  selector: "app-deleteprofile",
  templateUrl: "./deleteprofile.component.html",
  styleUrls: ["./deleteprofile.component.css"],
})
export class DeleteprofileComponent implements OnInit {
  public userId;
  public username;
  public isDeleted = false;
  public message;
  public userName;
  public isUsernameWrong = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    // if user is not logged in
    if (!localStorage.getItem("username")) this.router.navigate(["login"]);

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("userid");
    });
    this.userName = localStorage.getItem("username");
  }
  deleteProfile() {
    console.log(this.username);
    if (this.userName == this.username) {
      this.profileService.deleteProfile(this.userId).subscribe(
        (res) => {
          //console.log(res);
          this.isDeleted = true;
          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          localStorage.removeItem("profileid");
          console.log("profile deleted");
          this.message =
            "Profile is deleted. Thanks for your valuable time. We appriciate your decision. feel free to open new account anytime.";
        },
        (err) => {
         // console.log(err);
          this.message = "Error: Please try again.";
        }
      );
    } else {
      this.isUsernameWrong = true;
      this.message = "please enter correct username";
    }
  }
}