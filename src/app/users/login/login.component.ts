import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";
import { ValidationService } from "src/app/service/validation.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  public isAgree = false;
  private userData = {};
  public isDone = false;
  public defaulter;
  public isError = false;
  public message;
  public isUnauth;
  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.isUnauth = localStorage.getItem("isUnauth");
    if (this.isUnauth === "true") {
      this.isError=true;
      this.message = "Unauthorized Access! Please log in first";
    }
  }

  isValidPassword() {
    if (!this.validationService.isValidPassword(this.password)) {
      this.isError = true;

      this.message =
        "Password Must be minimum of 8 characterand maximum of 15 character long and must  contain atleast 1 upper case, 1 lower case, 1 numeric and 1 special character.";
      this.validationService.isValidEmail(this.password);
    }
  }
  reset() {
    this.isError = false;
  }
  login() {
    this.userData = {
      name: this.username,
      password: this.password,
    };
    if (!this.isAgree) {
      console.log(this.isAgree);
      console.log("Agree terms and conditions to continue");
      this.isError = true;
      this.message = "Please Agree to terms and condition";
      return;
    }
    this.authService.loginUser(this.userData).subscribe(
      (res) => {
        console.log(res);
        this.isError = false;
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", this.username);
        console.log(this.username);
        this.router.navigate(["profile"]);
      },
      (err) => {
        console.log(err.error);
        this.isError = true;
        this.defaulter = err.error.defaulter;
        if (this.defaulter == "email") {
          this.message = "Invalid Email";
        } else if (this.defaulter == "username") {
          this.isError = true;
          this.message = "Invalid Username";
        } else {
          this.message =
            "Password Must be minimum of 8 characterand maximum of 15 character long and must  contain atleast 1 upper case, 1 lower case, 1 numeric and 1 special character.";
        }
      }
    );
  }
}
