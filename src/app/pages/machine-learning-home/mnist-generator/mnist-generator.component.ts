import { Component, OnInit } from '@angular/core';
import { GridManager } from 'src/app/shared/services/gridManager.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment"
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mnist-generator',
  templateUrl: './mnist-generator.component.html',
  styleUrls: ['./mnist-generator.component.css'],
  providers:[GridManager]
})
export class MnistGeneratorComponent implements OnInit {
  // Latent Variables
  L0 = 0
  L1 = 0
  L2 = 0
  L3 = 0
  L4 = 0
  L5 = 0
  L6 = 0
  L7 = 0
  L8 = 0
  L9 = 0

  processing = false

  constructor(
    private gridmng: GridManager,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.gridmng.setGridsize(28)
  }

  getRandomNumber(){
    this.L0 = Math.random()
    this.L1 = Math.random()
    this.L2 = Math.random()
    this.L3 = Math.random()
    this.L4 = Math.random()
    this.L5 = Math.random()
    this.L6 = Math.random()
    this.L7 = Math.random()
    this.L8 = Math.random()
    this.L9 = Math.random()
    this.getNumber()
  }

  getNumber(){
    if (!(this.processing)){
      //you can only send another request once the previous has been evaluated
      this.processing = true
      let data = {
        "latentVector": [this.L0,this.L1,this.L2,this.L3,this.L4,this.L5,this.L6,this.L7,this.L8,this.L9]
      }
      this.http.post(environment.MNIST_GENERATOR,data)
      .subscribe( res => {
        this.processing = true
        let GANImage = res["GANImage"]
        GANImage.forEach((row,rowIdx) => {
          row.forEach((PixelValue,PixelValueIdx) => {
            this.gridmng.gridArr[rowIdx][PixelValueIdx].value = PixelValue
          });
        });
        this.processing = false
      })
  }
  }

}
