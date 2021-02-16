import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;
  public username;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    if (localStorage.getItem("isUnauth") === "false") {
      this.isLoggedIn = true;
    }
  }
  logout() {
    this.authService.loggedOut();
    this.isLoggedIn = false;

    this.router.navigate(["/myfeed"]);
  }
}
