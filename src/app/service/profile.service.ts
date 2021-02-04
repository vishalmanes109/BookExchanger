import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private _profileUrl = "http://localhost:3000/api/profile/";
  //private _favouriteGenreUrl="http://localhost:3000/api//"
  constructor(private http: HttpClient) {}
  makeProfile(profileData) {
    // console.log("hi",profileData)

    return this.http.post<any>(this._profileUrl, profileData);
  }
  getProfile(username) {
    return this.http.get<any>(this._profileUrl + "name/" + username);
  }
  getProfileByProfileId(profileId) {
    return this.http.get<any>(this._profileUrl + "id/" + profileId);
  }
  deleteProfile(userId) {
    console.log("from ser", userId);
    return this.http.delete<any>(this._profileUrl + userId);
  }
  updateLocation(locationData) {
    console.log("locationData", locationData);
    return this.http.patch<any>(this._profileUrl + "location", locationData);
  }
  updateFavGenre(oldGenreList,newGenreList, profileId) {

    let favGenreData = {
      new_fav_genre_list: newGenreList,
      old_fav_genre_list: oldGenreList,
      profileid: profileId,
    };
    console.log(favGenreData)
    return this.http.patch<any>(this._profileUrl + "genres", favGenreData);
  }
  updateEmail(email, profileId) {
    let updateEmailData = {
      email,
      profileId,
    };
    console.log(updateEmailData);
    return this.http.patch<any>(this._profileUrl + "email", updateEmailData);
  }
}

