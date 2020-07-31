import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @Output() closeSn = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.closeSn.emit("test")
  }

}
