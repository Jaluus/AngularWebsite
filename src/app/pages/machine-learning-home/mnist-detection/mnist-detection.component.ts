import { Component, OnInit } from '@angular/core';
import { GridManager } from 'src/app/shared/services/gridManager.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment"
import { map } from 'rxjs/operators';
import { R3TargetBinder } from '@angular/compiler';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-mnist-detection',
  templateUrl: './mnist-detection.component.html',
  styleUrls: ['./mnist-detection.component.css'],
  providers:[GridManager]
})
export class MnistDetectionComponent implements OnInit {

  BURL = environment.BACKEND_URL + "/api/ML/mnist"
  pred_vector_idx = [0,1,2,3,4,5,6,7,8,9]
  pred_vector_CNN = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
  pred_vector_DNN = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];

  constructor(
    public gridmng : GridManager,
    private http : HttpClient,
    public WSM : WindowSizeManager) { }

  ngOnInit(): void {
    this.gridmng.setGridsize(28)
  }

  predict(){
    let Griddata = this.gridmng.getGridArr()
    let data = {
      "data": Griddata
    }
    this.http.post(this.BURL,data)
    .pipe(map(res => {  // Rounding pipe
      let CNN_pred = []
      let DNN_pred = []
      for (let idx in res["pred_vector_CNN"][0]){
        CNN_pred.push(Math.round(res["pred_vector_CNN"][0][idx]*100) / 100)
        DNN_pred.push(Math.round(res["pred_vector_DNN"][0][idx]*100) / 100)
      }
      return [CNN_pred, DNN_pred]
    }))
    .subscribe( res => {
      this.pred_vector_CNN = res[0];
      this.pred_vector_DNN = res[1];

    })
  }

  getColor(weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    let red = w2 * 255
    let green = w1 * 255

    return "rgb(" + red + "," + green + ",0)";
}

}
