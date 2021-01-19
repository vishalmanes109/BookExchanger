import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private _profileUrl = "http://localhost:3000/api/profile/";
  constructor(private http: HttpClient) {}
  makeProfile(profileData) {
    console.log("hi",profileData)

     return this.http.post<any>(this._profileUrl, profileData);
  }
}
