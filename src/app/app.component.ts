import { Component } from "@angular/core";
import {LoaderComponent} from "./core/loader/loader.component"
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public title = "BookXchanger";
  public loaderComponent=LoaderComponent;
}
