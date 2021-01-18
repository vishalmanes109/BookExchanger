import { Component, OnInit } from "@angular/core";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { SuiModule } from "ng2-semantic-ui";
import { LocationService } from "src/app/service/location.service";

@Component({
  selector: "app-createprofile",
  templateUrl: "./createprofile.component.html",
  styleUrls: ["./createprofile.component.css"],
})
export class CreateprofileComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public isAgree=false;
  public latitude;
  public longitude;
  public location;
  public foundLocation;
  public placeName;
  public username;
  public favGenreList: number[] = new Array();
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.dropdownList = [
      { id: 1, text: "Adult Fiction" },
      { id: 2, text: "Horror" },
      { id: 3, text: "Fiction" },
      { id: 4, text: "Fantasy" },
      { id: 5, text: "Historical Fiction" },
      { id: 6, text: "Mystery" },
      { id: 7, text: "Politics" },
      { id: 8, text: "Science Fiction" },
      { id: 9, text: "Thriller" },
      { id: 10, text: "War" },
      { id: 11, text: "Art" },
      { id: 12, text: "Biography" },
      { id: 13, text: "Business" },
      { id: 14, text: "Classics" },
      { id: 15, text: "Comics" },
      { id: 16, text: "Contemporary" },
      { id: 17, text: "Cookbooks" },
      { id: 18, text: "Crime" },
      { id: 19, text: "History" },
      { id: 20, text: "Humor and Comedy" },
      { id: 21, text: "Manga" },
      { id: 22, text: "Memoir" },
      { id: 23, text: "Nonfiction" },
      { id: 24, text: "Paranormal" },
      { id: 25, text: "Philosophy" },
      { id: 26, text: "Poetry" },
      { id: 27, text: "Psychology" },
      { id: 28, text: "Religion" },
      { id: 29, text: "Romance" },
      { id: 30, text: "Science" },
      { id: 31, text: "Self Help" },
      { id: 32, text: "Suspense" },
      { id: 33, text: "Spirituality" },
      { id: 34, text: "Sports" },
      { id: 35, text: "Sports" },
      { id: 36, text: "Young Adult" },
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
    console.log(item);
    console.log(this.favGenreList);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item:any){
    console.log(item)
    // delete this.favGenreList[item.id];
     const index: number = this.favGenreList.indexOf(item.id);
     if (index !== -1) {
       this.favGenreList.splice(index, 1);
     }    
    console.log(this.favGenreList)
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log(` lol More or less ${position.coords.accuracy} meters.`);

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
    }
  }
  onBlurGetLocation() {
    this.locationService.getPlaceName(this.location).subscribe((res) => {
      this.foundLocation = true;
      this.placeName = res.features[0].place_name;
      console.log(res.features[0].place_name),
        (err) => {
          console.log(err);
        };
    });
  }
  createProfile() {
    console.log(this.username)
    console.log(this.favGenreList)
    console.log(this.placeName)
    console.log(this.isAgree)
  }
}
