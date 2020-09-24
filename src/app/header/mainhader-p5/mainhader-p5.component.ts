import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainhader-p5',
  templateUrl: './mainhader-p5.component.html',
  styleUrls: ['./mainhader-p5.component.css'],
})
export class MainhaderP5Component implements OnInit {
  @Input() heading = 'heading';
  @Input() subheading = 'subheading';
  constructor() {}

  ngOnInit(): void {}
}
