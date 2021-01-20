import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class LocationService {
  private apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoid2l6engiLCJhIjoiY2todnhvMno5MXI1eDJxcGJlbG1rYzlkZSJ9.SzeDV7lLEGcyoo4o6gD7zw&autocomplete=false&limit=1&country=IN&worldview=in`;
  private result;
  constructor(private http: HttpClient) {}

  getPlaceName(inputLocation) {
    console.log(inputLocation);
    return this.http.get<any>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputLocation}.json?access_token=pk.eyJ1Ijoid2l6engiLCJhIjoiY2todnhvMno5MXI1eDJxcGJlbG1rYzlkZSJ9.SzeDV7lLEGcyoo4o6gD7zw&autocomplete=false&limit=1&country=IN&worldview=in`
    );
  }
  
  getPlaceNameByCoordinates(lat, long) {
    // console.log(lat);
    // console.log(long);
    // console.log(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=pk.eyJ1Ijoid2l6engiLCJhIjoiY2todnhvMno5MXI1eDJxcGJlbG1rYzlkZSJ9.SzeDV7lLEGcyoo4o6gD7zw&autocomplete=false&limit=1&country=IN&worldview=in`
    // );

    return this.http.get<any>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=pk.eyJ1Ijoid2l6engiLCJhIjoiY2todnhvMno5MXI1eDJxcGJlbG1rYzlkZSJ9.SzeDV7lLEGcyoo4o6gD7zw&autocomplete=false&limit=1&country=IN&worldview=in`
    );
  }
}
