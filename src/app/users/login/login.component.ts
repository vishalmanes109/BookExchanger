import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.userData = {
      name: this.username,
      email: this.password,
    };
    if (!this.isAgree) {
      console.log("Agree terms and conditions to continue");
      this.isError = true;
      this.message = "Please Agree to terms and condition";
      return;
    }

    this.authService.loginUser(this.userData).subscribe(
      res=>{},
      err=>{}

    )

  }
}
