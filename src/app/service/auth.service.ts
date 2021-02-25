import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/user/";
  private _loginUrl = "http://localhost:3000/api/user/login";
  private _uniqueUserUrl = "http://localhost:3000/api/user/";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http.get<any>(this._uniqueUserUrl + "uniqueuser/" + username);
  }
  isEmailExist(email) {
    return this.http.get<any>(this._uniqueUserUrl + "uniqueuseremail/" + email);
  }
  loggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("isUnauth");
    localStorage.removeItem("profileid");
  }
}
