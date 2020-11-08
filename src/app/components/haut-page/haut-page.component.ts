import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-haut-page',
  templateUrl: './haut-page.component.html',
  styleUrls: ['./haut-page.component.scss']
})
export class HautPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

}
