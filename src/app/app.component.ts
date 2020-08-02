import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  screenWidth:number;
  screenHeight:number;
  bigScreen = true;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
   console.log(this.screenHeight, this.screenWidth);
   if(this.screenWidth<=900){
     this.bigScreen=false
   } else {
     this.bigScreen=true
   }
  }

  constructor() {
    this.onResize();
  }

}

