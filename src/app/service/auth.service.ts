import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/user/";
  private _loginUrl = "http://localhost:3000/api/user/login";
  private _uniqueUserUrl = "http://localhost:3000/api/user/uniqueuser";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem("token");
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isUserAvailable(username) {
    console.log(username);
    return this.http.get<any>(this._uniqueUserUrl+"/" +username, );
  }
}
