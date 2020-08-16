import { Component, OnInit, OnDestroy } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { ThemeManager } from "src/app/shared/services/themeManager.service"

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit , OnDestroy{
  constructor(
    private links : LinkManager,
    public WSM: WindowSizeManager,
    public TM: ThemeManager) { }

  TODO = [
    "Adjust Colors",
    "Implement Theme switch",
    "Learn Unity",
    "Embed Unity-Game"
  ]

  ngOnInit(): void {
    this.links.onHomepage=true;
  }

  ngOnDestroy(){
    this.links.onHomepage=false;
  }

}
