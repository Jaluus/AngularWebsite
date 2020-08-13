import { Component, OnInit } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
})
export class TestpageComponent implements OnInit {
  constructor(public WSM: WindowSizeManager, private http: HttpClient) {}

  BKU = environment.BACKEND_URL;

  itemName;
  itemPrice;
  itemList = [];

  getItems() {
    this.http.get(this.BKU + '/items').subscribe((res) => {
      this.itemList = res["items"]
      console.log(this.itemList);
    });
  }

  postItem() {
    let itemData = {price : this.itemPrice}
    this.http.post(this.BKU + '/item' + "/" + this.itemName, itemData).subscribe((res) => {
      console.log(res);
    },error=>{
      console.log("u dun goofed")
    })
  }

  ngOnInit(): void {}
}
