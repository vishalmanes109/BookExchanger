import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private _profileUrl = "http://localhost:3000/api/profile/";
  private _imageUrl = "http://localhost:3000/api/upload/";
  //private _favouriteGenreUrl="http://localhost:3000/api//"
  constructor(private http: HttpClient) {}
  makeProfile(profileData) {
    return this.http.post<any>(this._profileUrl, profileData);
  }
  getProfile(username) {
    return this.http.get<any>(this._profileUrl + "name/" + username);
  }
  getProfileByProfileId(profileId) {
    return this.http.get<any>(this._profileUrl + "id/" + profileId);
  }
  deleteProfile(userId) {
    return this.http.delete<any>(this._profileUrl + userId);
  }
  updateLocation(locationData) {
    return this.http.patch<any>(this._profileUrl + "location", locationData);
  }
  updateFavGenre(oldGenreList, newGenreList, profileId) {
    let favGenreData = {
      new_fav_genre_list: newGenreList,
      old_fav_genre_list: oldGenreList,
      profileid: profileId,
    };
    return this.http.patch<any>(this._profileUrl + "genres", favGenreData);
  }
  updateEmail(email, profileId) {
    let updateEmailData = {
      email,
      profileId,
    };
    return this.http.patch<any>(this._profileUrl + "email", updateEmailData);
  }
  uploadAvtar(imageData) {
    let data = { data: imageData };
    return this.http.post<any>(this._imageUrl, data);
  }
  updateAvatar(avatrData) {
    return this.http.patch<any>(this._profileUrl + "avatar", avatrData);
  }

  // run() {
  //   let newArr = Array();
  //   let old = Array();

  //   for (let i = 0; i < 3; i++) {
  //     if (newArr[0] == old[i] && query1 != false) {
  //       query1 = false;
  //       break;
  //     }
  //     if (newArr[1] == old[i] && query1 != false) {
  //       query2 = false;
  //       break;
  //     }
  //     if (newArr[2] == old[i] && query1 != false) {
  //       query3 = false;
  //       break;
  //     }
  //     keep.push(old[i]);
  //   }
  // }
}
