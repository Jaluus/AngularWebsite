import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  text = "hover Here!"
  i = 0
  textArr = ["Stop","I said Stop!" , "AHHHHHHHHHHHHHHHHHHHHHH", "it HURTSSS", "im gonna crash if you Click again"]
  constructor() { }

  ngOnInit(): void { 
  }

  changeTxt(){
    this.text = "get Off!"
  }

  changeTxtBack(){
    this.text = "Thanks"
  }

  warning(){
    this.text= this.textArr[this.i]
    this.i= this.i+1;
  }

}
