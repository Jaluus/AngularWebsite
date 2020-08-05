import { Component, OnInit } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  constructor( public WSM: WindowSizeManager ) { }

  ngOnInit(): void {
  }

}
