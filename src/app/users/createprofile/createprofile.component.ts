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
  public isAgree;
  public latitude;
  public longitude;
  public location;
  public foundLocation;
  public placeName;
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.dropdownList = [
      { id: 1, text: "Fantasy" },
      { id: 2, text: "Fiction" },
      { id: 5, text: "Horror" },
      { id: 6, text: "Self Help" },
    ];
    this.selectedItems = [
      { id: 1, text: "Fantasy" },
      { id: 2, text: "Fiction" },
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
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
         this.longitude = position.coords.longitude;
         this.latitude = position.coords.latitude;
        
    this.locationService.getPlaceNameByCoordinates(this.longitude,this.latitude).subscribe(
      (res)=>{
        this.placeName=res.features[0].place_name
        this.foundLocation=true;
        console.log(res.features[0].place_name);
      }
      ,
      (err)=> 
      {
        console.log(err)

      }
    )

      });
    } else {
      console.log("No support for geolocation");
    }
  }
  createProfile() {
    this.locationService.getPlaceName(this.location).subscribe((res) => {
      this.foundLocation = true;
      this.placeName = res.features[0].place_name;
      console.log(res.features[0].place_name),
        (err) => {
          console.log(err);
        };
    });
  }
}
