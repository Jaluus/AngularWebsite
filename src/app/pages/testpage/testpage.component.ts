import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
})
export class TestpageComponent implements OnInit{
  constructor(public WSM: WindowSizeManager) {}
  @ViewChild("test",{static : true}) test;
  sliderValue = 11;
  ngOnInit(): void {
  }
}
