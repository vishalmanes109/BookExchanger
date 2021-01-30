import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationService } from "src/app/service/location.service";
import { ProfileService } from "src/app/service/profile.service";

@Component({
  selector: "app-updateprofile",
  templateUrl: "./updateprofile.component.html",
  styleUrls: ["./updateprofile.component.css"],
})
export class UpdateprofileComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public eCheck;
  public eCheckDisabled;
  public eCheckReadonly;
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
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.profileId = params.get("profileid");
      //console.log(this.profileId);
    });
    this.username= localStorage.getItem('username')

    this.profileService.getProfileByProfileId(this.profileId).subscribe(
      (res) => {
        this.profileData = res.message[0];
        //console.log(this.profileData)
        this.genreList = res.genrelist;
        this.email = this.profileData.email;
        this.location = this.profileData.location;

        this.placeName =
          this.location +
          ", latitude: " +
          this.profileData.latitude +
          ", longitude: " +
          this.profileData.longitude;

        console.log(this.genreList);
        this.isDataFetch = true;
        this.selectedItems = [
          { id: this.genreList[0].id, text: this.genreList[0].name },
          { id: this.genreList[1].id, text: this.genreList[1].name },
          { id: this.genreList[2].id, text: this.genreList[2].name },
        ];
        //console.log(res);
      },
      (err) => {
        console.log(err);
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
    // console.log(item);
    this.favGenreList.push(item.id);
    //console.log(this.favGenreList)
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  onItemDeSelect(item: any) {
    //console.log(item);
    // delete this.favGenreList[item.id];
    const index: number = this.favGenreList.indexOf(item.id);
    if (index !== -1) {
      this.favGenreList.splice(index, 1);
    }
    // console.log(this.favGenreList)
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
              console.log(res.features[0].place_name);
            },
            (err) => {
              console.log(err);
            }
          );
      });
    } else {
      console.log("No support for geolocation");
      alert("no support for geolocation");
    }
  }
  
  onEnterGetLocation() {
    this.locationService.getPlaceName(this.location).subscribe((res) => {
      this.foundLocation = true;
      // console.log(res);
      this.longitude = res.features[0].center[0];

      this.latitude = res.features[0].center[1];
      console.log(this.latitude + " ;" + this.longitude);
      this.placeName = res.features[0].place_name;
      console.log(res.features[0].place_name),
        (err) => {
          console.log(err);
        };
    });
  }
  updateProfile() {}
}
