import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public what;
  public how;
  public why;

  constructor() { }

  ngOnInit(): void {
    this.what =
      'BookXchanger is the place to swap/exchange/trade your books. Our goal is to allow people to easily trade books that have been collecting dust on their bookshelves for books they want for free.';
  this.how="Simple and Easy";
  this.why="Well, let see why"
    }

}
