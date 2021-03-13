import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ValidationService } from "src/app/service/validation.service";
import { AuthService } from "../../service/auth.service";
import { SpinnerVisibilityService } from "ng-http-loader";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public registerUserData = {};
  public username: string;
  public email: string;
  public password: string;
  public isAgree;
  public isDone = false;
  public defaulter;
  public isError = false;
  public message;
  public isUnique = false;
  public confirmpassword: string;
  public isAvailable = false;

  ngOnInit(): void {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {
    this.isAvailable = false;
  }

  isUniqueName() {
    this.isAvailable = false;
    this.isError=false;

    this.authService.isUserAvailable(this.username).subscribe(
      (res) => {
        this.isAvailable = true;
        this.message = "Username Available";
      },
      (err) => {
        this.isError = true;
        this.message =
          "Username is already taken, please select different username.";
      }
    );
  }
  
  isValidEmail() {
    this.isAvailable = false;

    if (!this.validationService.isValidEmail(this.email)) {
      this.isError = true;
      this.message = "Invalid Email";
      return;
    }
    this.authService.isEmailExist(this.email).subscribe(
      (res) => {},
      (err) => {
        this.isError = true;
        this.message = "Profile is already created with this email id.";
      }
    );
  }
  isValidPassword() {
    if (
      this.password &&
      !this.validationService.isValidPassword(this.password)
    ) {
      this.isError = true;

      this.message =
        "Password Must be minimum of 8 characterand maximum of 15 character long and must  contain atleast 1 upper case, 1 lower case, 1 numeric and 1 special character.";
      this.validationService.isValidEmail(this.password);
    }
  }
  reset() {
    this.isError = false;
  }
  isPasswordSame() {
    if (this.password != this.confirmpassword) {
      this.isError = true;
      this.message = "Password and Confirmed password does not match";
      return;
    }
  }
  registerUser() {
    if (!this.isAgree) {
      this.isError = true;
      this.message = "Please Agree to terms and condition";
      return;
    }
    if (this.password != this.confirmpassword) {
      this.isError = true;
      this.message = "Password and Confirmed password does not match";
      return;
    }
    this.registerUserData = {
      name: this.username,
      password: this.password,
      email: this.email,
      isAgree: this.isAgree,
    };

    this.authService.registerUser(this.registerUserData).subscribe(
      (res) => {
        this.isDone = true;
        localStorage.setItem("status", "register");
        this.isError = false;
        localStorage.setItem("username", this.username);
        setTimeout(() => {
          if (res.success == 1 && this.isDone) {
            this.router.navigate(["createprofile"]);
          }
        }, 2000);
      },
      (err) => {
        this.isError = true;
        this.defaulter = err.error.defaulter;
        if (this.defaulter == "email") {
          this.message = "Invalid Email";
        } else if (this.defaulter == "username") {
          this.isError = true;
          this.message =
            "Username is already taken, please select different username.";
        } else {
          this.message =
            "Password Must be minimum of 8 characterand maximum of 15 character long and must  contain atleast 1 upper case, 1 lower case, 1 numeric and 1 special character.";
        }
      }
    );
  }
}
