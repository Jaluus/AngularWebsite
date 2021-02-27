import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-component',
  templateUrl: './showcase-component.component.html',
  styleUrls: ['./showcase-component.component.css'],
})
export class ShowcaseComponentComponent implements OnInit {
  @Input() name = 'Name of the Component';
  @Input() subDesc = '';
  @Input() imagePath =
    'https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3=s180-rw';
  @Input() description = 'here is  a description';

  constructor() {}

  imgLoad = false;

  ngOnInit(): void {}

  showImg() {
    this.imgLoad = true;
  }
}
