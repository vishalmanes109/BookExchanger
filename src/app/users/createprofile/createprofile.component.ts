import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { SuiModule } from "ng2-semantic-ui";
import { LocationService } from "src/app/service/location.service";
import { ProfileService } from "src/app/service/profile.service";

@Component({
  selector: "app-createprofile",
  templateUrl: "./createprofile.component.html",
  styleUrls: ["./createprofile.component.css"],
})
export class CreateprofileComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public isAgree = false;
  public latitude;
  public longitude;
  public location;
  public foundLocation;
  public placeName;
  public username;
  public favGenreList: number[] = new Array();
  public isDone = false;
  public message;
  public isError = false;

  constructor(
    private locationService: LocationService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.dropdownList = [
      { id: 1, text: "Adult Fiction" },
      { id: 2, text: "Epic Fantasy" },
      { id: 3, text: "Horror" },
      { id: 4, text: "Fiction" },
      { id: 5, text: "Fantasy" },
      { id: 6, text: "Historical Fiction" },
      { id: 7, text: "Mystery" },
      { id: 8, text: "Politics" },
      { id: 9, text: "Science Fiction" },
      { id: 10, text: "Thriller" },
      { id: 11, text: "War" },
      { id: 12, text: "Art" },
      { id: 13, text: "Biography" },
      { id: 14, text: "Business" },
      { id: 15, text: "Classics" },
      { id: 16, text: "Comics" },
      { id: 17, text: "Contemporary" },
      { id: 18, text: "Cookbooks" },
      { id: 19, text: "Crime" },
      { id: 20, text: "History" },
      { id: 21, text: "Humor and Comedy" },
      { id: 22, text: "Manga" },
      { id: 23, text: "Memoir" },
      { id: 24, text: "Nonfiction" },
      { id: 25, text: "Paranormal" },
      { id: 26, text: "Philosophy" },
      { id: 27, text: "Poetry" },
      { id: 28, text: "Psychology" },
      { id: 29, text: "Religion" },
      { id: 30, text: "Romance" },
      { id: 31, text: "Science" },
      { id: 32, text: "Self Help" },
      { id: 33, text: "Suspense" },
      { id: 34, text: "Spirituality" },
      { id: 35, text: "Sports" },
      { id: 36, text: "Travel" },
      { id: 37, text: "Young Adult" },
    ];
    // this.selectedItems = [
    //   { id: 1, text: "Adult Fiction" },
    //   { id: 2, text: "Horror" },
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3,
    };
  }

  onItemSelect(item: any) {
    this.favGenreList.push(item.id);
    //console.log(item);
    //console.log(this.favGenreList);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  onItemDeSelect(item: any) {
    //console.log(item);
    // delete this.favGenreList[item.id];
    const index: number = this.favGenreList.indexOf(item.id);
    if (index !== -1) {
      this.favGenreList.splice(index, 1);
    }
   // console.log(this.favGenreList);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        //console.log(this.longitude)
       // console.log(` lol More or less ${position.coords.accuracy} meters.`);

        this.locationService
          .getPlaceNameByCoordinates(this.longitude, this.latitude)
          .subscribe(
            (res) => {
              this.placeName = res.features[0].place_name;
              this.foundLocation = true;
             // console.log(res.features[0].place_name);
            },
            (err) => {
              console.log(err);
            }
          );
      });
    } else {
     console.log("No support for geolocation");
     alert("no support for geolocation")
    }
  }
  onBlurGetLocation() {
    this.locationService.getPlaceName(this.location).subscribe((res) => {
      this.foundLocation = true;
      // console.log(res);
      this.longitude=res.features[0].center[0]

      this.latitude = res.features[0].center[1];
      console.log(this.latitude + " ;" + this.longitude);
      this.placeName = res.features[0].place_name;
      console.log(res.features[0].place_name),
        (err) => {
          console.log(err);
        };
    });

  }
  submit() {
    //console.log("lol submit")
    //  console.log(this.username);
    //  console.log(this.favGenreList);
    // // location = this.placeName;
    //console.log(this.isAgree);
    if (!this.isAgree) {
      this.isError = true;
      this.message = "Please agree to tems and conditions";
      return;
    }
    if (!this.placeName) {
      this.isError = true;
      this.message =
        "Please provide location. either write name of location or give location access";
    }
    if (this.favGenreList.length != 3) {
      this.isError = true;
      this.message = "Please select exactly 3 genres";
      return;
    }
    let profileData = {
      location: this.placeName,
      latitude: this.latitude,
      longitude: this.longitude,
      premium: false,
      username: this.username,
      fav_genre_list:this.favGenreList
    };
    //console.log(profileData);
      this.profileService.makeProfile(profileData).subscribe(
        (res) => {
          console.log("lol");
           console.log(res);
          this.isDone = true;
          this.isError=false;
          this.message = "Congratulations Profile is created";
          setTimeout(() => {
            if (res.success == 1 && this.isDone) {
              this.router.navigate(["myfeed"]);
            }
          }, 2000);
        },
        (err) => {
           console.log(err);
          this.isError = true;
          if (err.error.error.code == 23502){
            this.message="Profile creation failed. please try again! "
            return
          }
            this.message = "profile is already created. ";
          setTimeout(() => {
            if (this.isError) {
              this.message = "redirecting towards update profile page";
            }
          }, 1000);
          setTimeout(() => {
            if (this.isError) {
              this.router.navigate(["updateprofile"]);
            }
          }, 2500);
        }
      );
  }
}
