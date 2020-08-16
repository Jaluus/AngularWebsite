import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {
  @Input() heading = "heading"
  @Input() subheading = "subheading"
  constructor() { }

  ngOnInit(): void {
  }

}
