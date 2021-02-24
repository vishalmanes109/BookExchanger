import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationService } from "src/app/service/location.service";
import { ProfileService } from "src/app/service/profile.service";
import { ValidationService } from "src/app/service/validation.service";
import * as _ from "lodash";

@Component({
  selector: "app-updateprofile",
  templateUrl: "./updateprofile.component.html",
  styleUrls: ["./updateprofile.component.css"],
})
export class UpdateprofileComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public profileId;
  public email;
  public profileData;
  public genreList;
  public isDataFetch = false;
  public favGenreList = new Array();
  public location;
  public latitude;
  public longitude;
  public foundLocation;
  public placeName;
  public username;
  public message;
  public isError = false;
  public isDone = false;
  public newLocationName;
  public oldFavGenre;
  public avatar;
  selectedFile: File = null;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imageUploadNote;
  public isImageUploaded = false;
  public avatarUrl;
  public oldAvatar;
  public contact;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private locationService: LocationService,
    private validationService: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.profileId = params.get("profileid");
    });
    this.username = localStorage.getItem("username");

    this.profileService.getProfileByProfileId(this.profileId).subscribe(
      (res) => {
        this.profileData = res.message[0];
        this.genreList = res.genrelist;
        this.email = this.profileData.email;
        this.location = this.profileData.location;
        this.newLocationName = this.location;
        this.oldAvatar = this.profileData.avatar;
        this.placeName =
          this.location +
          ", latitude: " +
          this.profileData.latitude +
          ", longitude: " +
          this.profileData.longitude;
        this.contact = this.profileData.contact;
        this.isDataFetch = true;
        this.selectedItems = [
          { id: this.genreList[0].id, text: this.genreList[0].name },
          { id: this.genreList[1].id, text: this.genreList[1].name },
          { id: this.genreList[2].id, text: this.genreList[2].name },
        ];
        this.oldFavGenre = this.selectedItems;
      },
      (err) => {
        this.message = "Error, Try again";
      }
    );

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
    this.isError = false;
    this.favGenreList.push(item.id);
  }
  onSelectAll(items: any) {}
  onItemDeSelect(item: any) {
    this.isError = false;

    const index: number = this.favGenreList.indexOf(item.id);
    if (index !== -1) {
      this.favGenreList.splice(index, 1);
    }
  }
  getLocation(): void {
    this.isError = false;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;

        this.locationService
          .getPlaceNameByCoordinates(this.longitude, this.latitude)
          .subscribe(
            (res) => {
              this.placeName = res.features[0].place_name;
              this.newLocationName = this.placeName;
              this.foundLocation = true;
            },
            (err) => {}
          );
      });
    } else {
      alert("no support for geolocation");
    }
  }

  onEnterGetLocation() {
    this.isError = false;

    this.locationService.getPlaceName(this.placeName).subscribe((res) => {
      this.foundLocation = true;
      this.longitude = res.features[0].center[0];

      this.latitude = res.features[0].center[1];
      this.placeName = res.features[0].place_name;
      this.newLocationName = this.placeName;
      (err) => {};
    });
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
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
  onBlurValidateContact() {
    //  console.log(this.contact);
    this.isError = false;
    let mobile = this.contact;
    console.log(mobile);
    try {
      console.log(this.contact);
      let regex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
      if (!mobile.match(regex)) {
        this.isError = true;
        this.message = "Please enter valid mobile number";
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
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
  updateProfile() {
    if (this.avatarUrl && this.oldAvatar != this.avatarUrl) {
      let avatarData = {
        avatar: this.avatarUrl,
        id: this.profileId,
      };
      console.log(avatarData);
      this.profileService.updateAvatar(avatarData).subscribe(
        (res) => {
          this.isError = false;
          this.isDone = true;
          this.message = "Profile Updated";
          this.router.navigate([[`profile/${this.username}`]]);
        },
        (err) => {
          this.isError = true;
          this.message = "Avatar updation failed, Please try again ";
        }
      );
    }
    if (this.profileData.email != this.email) {
      if (!this.validationService.isValidEmail(this.email)) {
        this.isError = true;
        this.message = "Invalid Email";
      }
      this.profileService.updateEmail(this.email, this.profileId).subscribe(
        (res) => {
          this.isError = false;
          this.isDone = true;
          this.message = "Profile Updated";
          this.router.navigate([[`profile/${this.username}`]]);
        },
        (err) => {
          this.isError = true;
          this.message = "Invalid Email";
        }
      );
    }
    if (this.profileData.contact != this.contact) {
      if (!this.onBlurValidateContact()) {
        this.isError = true;
        this.message = "Invalid Mobile Number";
      }
      this.profileService.updateContact(this.contact, this.profileId).subscribe(
        (res) => {
          this.isError = false;
          this.isDone = true;
          this.message = "Profile Updated";
          this.router.navigate([[`profile/${this.username}`]]);
        },
        (err) => {
          this.isError = true;
          this.message = "Invalid Contact details";
        }
      );
    }
    if (this.profileData.location != this.newLocationName) {
      let locationData = {
        profileid: this.profileId,
        latitude: this.latitude,
        longitude: this.longitude,
        location: this.newLocationName,
      };
      this.profileService.updateLocation(locationData).subscribe(
        (res) => {
          this.isError = false;
          this.isDone = true;
          this.message = "Profile Updated";
          this.router.navigate([[`profile/${this.username}`]]);
        },
        (err) => {
          this.isError = true;
          this.message = "Invalid Email";
        }
      );
    }
    if (this.selectedItems.length < 3) {
      this.isError = true;
      this.message = "Please select exactly 3 genres";
      return;
    }

    if (this.oldFavGenre != this.selectedItems) {
      this.profileService
        .updateFavGenre(this.oldFavGenre, this.selectedItems, this.profileId)
        .subscribe(
          (res) => {
            this.message = "Profile Updated";
            this.router.navigate([[`profile/${this.username}`]]);
          },
          (err) => {
            this.message = "Profile Updation Failed, Try again";
          }
        );
    }
  }
}
