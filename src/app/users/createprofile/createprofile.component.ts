import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { SuiModule } from "ng2-semantic-ui";
import { LocationService } from "src/app/service/location.service";
import { ProfileService } from "src/app/service/profile.service";
import * as _ from "lodash";

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
  selectedFile: File = null;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imageUploadNote;
  public isImageUploaded = false;
  public avatarUrl = "../../../assets/avatar/35.png";
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
  }
  onSelectAll(items: any) {}
  onItemDeSelect(item: any) {
    const index: number = this.favGenreList.indexOf(item.id);
    if (index !== -1) {
      this.favGenreList.splice(index, 1);
    }
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = "Maximum size allowed is " + max_size / 1000 + "Mb";
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = "Only Images are allowed ( JPG | PNG )";
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  upload() {
    this.profileService.uploadAvtar(this.cardImageBase64).subscribe(
      (res) => {
        this.isImageUploaded = true;
        this.imageUploadNote = "Avtar uploaded";
        this.avatarUrl = res.message.secure_url;
      },
      (err) => {
        this.imageUploadNote = "Failed Try Again ";
      }
    );
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;

        this.locationService
          .getPlaceNameByCoordinates(this.longitude, this.latitude)
          .subscribe(
            (res) => {
              this.placeName = res.features[0].place_name;
              this.foundLocation = true;
            },
            (err) => {}
          );
      });
    } else {
      alert("no support for geolocation");
    }
  }
  onBlurGetLocation() {
    this.locationService.getPlaceName(this.location).subscribe((res) => {
      this.foundLocation = true;
      this.longitude = res.features[0].center[0];

      this.latitude = res.features[0].center[1];
      this.placeName = res.features[0].place_name;
      (err) => {};
    });
  }
  submit() {
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
      fav_genre_list: this.favGenreList,
      avatar: this.avatarUrl,
    };
    this.profileService.makeProfile(profileData).subscribe(
      (res) => {
        this.isDone = true;
        this.isError = false;
        this.message = "Congratulations Profile is created";
        setTimeout(() => {
          if (res.success == 1 && this.isDone) {
            this.router.navigate(["profile"]);
          }
        }, 2000);
      },
      (err) => {
        this.isError = true;
        if (err.error.error.code == 23502) {
          this.message = "Profile creation failed. please try again! ";
          return;
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
