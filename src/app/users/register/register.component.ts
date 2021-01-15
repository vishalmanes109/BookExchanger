import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  ngOnInit(): void {}
  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    this.registerUserData = {
      name: this.username.trim(),
      password: this.password.trim(),
      email: this.email.trim(),
      isAgree: this.isAgree,
    };
    console.log(this.registerUserData);
    if (!this.isAgree) {
      console.log("Agree terms and conditions to continue");
      this.isError=true;
      this.message="Please Agree to terms and condition"
      return;
    }

    this.authService.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        this.isDone = true;
        localStorage.setItem('status','register')
        this.isError=false;
        console.log(res.success);
        setTimeout(() => {
          if (res.success == 1 && this.isDone) {
            this.router.navigate(["createprofile"]);
          }
        }, 2000);
      },
      (err) => {
        console.log(err.error);
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
