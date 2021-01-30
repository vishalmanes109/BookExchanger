import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: "app-deletepost",
  templateUrl: "./deletepost.component.html",
  styleUrls: ["./deletepost.component.css"],
})
export class DeletepostComponent implements OnInit {
  public userId;
  public username;
  public isDeleted = false;
  public message;
  public userName;
  public notConfirm = false;
  public confirm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem("username")) this.router.navigate(["login"]);

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("userid");
    });
  }
  deletePost() {}
}
