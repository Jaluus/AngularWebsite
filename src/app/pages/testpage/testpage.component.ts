import { Component, OnInit } from '@angular/core';
import { GridManager } from '../../shared/services/gridManager.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
  providers:[GridManager]
})
export class TestpageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

