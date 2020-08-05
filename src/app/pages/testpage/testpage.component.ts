import { Component, OnInit } from '@angular/core';
import { GridManager } from '../../shared/services/gridManager.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
  providers:[GridManager]
})
export class TestpageComponent implements OnInit {
  constructor(
    public gridmng: GridManager,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
  }

}

