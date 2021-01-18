import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ValidationService } from "src/app/service/validation.service";
import { AuthService } from "../../service/auth.service";

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

  ngOnInit(): void {}
  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  isUniqueName() {
    this.authService.isUserAvailable(this.username).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  isValidEmail() {
    if (!this.validationService.isValidEmail(this.email)) {
      this.isError = true;
      this.message = "Invalid Email";
      console.log(this.validationService.isValidEmail(this.email));
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
  reset(){
    this.isError=false;
  }

  registerUser() {
    //console.log(this.registerUserData);
    if (!this.isAgree) {
      console.log("Agree terms and conditions to continue");
      this.isError = true;
      this.message = "Please Agree to terms and condition";
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
        console.log(res);
        this.isDone = true;
        localStorage.setItem("status", "register");
        this.isError = false;
        console.log(res.success);
        localStorage.setItem("username", this.username);
        setTimeout(() => {
          if (res.success == 1 && this.isDone) {
            this.router.navigate(["createprofile"]);
          }
        }, 2000);
      },
      (err) => {
        console.log("lol", err.error);
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
