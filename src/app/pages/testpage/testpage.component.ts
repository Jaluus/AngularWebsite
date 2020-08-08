import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  constructor(public WSM:WindowSizeManager) { }

  ngOnInit(): void {
  }

}

