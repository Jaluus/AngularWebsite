import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() startPath = "https://uslu.tech/pictures/Blender/";

  imgArr = [
    {path:this.startPath +"Würfel.png" , name:"Würfel"},
    {path:this.startPath +"Mond.png" , name:"Der Mond"},
    {path:this.startPath +"Fraktale/Fraktal2.png" , name:"Fraktale"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
