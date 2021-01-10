import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from "ng-multiselect-dropdown";

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
  constructor() {}

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
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude + " :" + latitude);
      });
    } else {
      console.log("No support for geolocation");
    }
  }
}
