import { Component, OnInit } from '@angular/core';
import { GridManager } from 'src/app/shared/services/gridManager.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment"
import { map } from 'rxjs/operators';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-mnist-detection',
  templateUrl: './mnist-detection.component.html',
  styleUrls: ['./mnist-detection.component.css'],
  providers:[GridManager]
})
export class MnistDetectionComponent implements OnInit {

  pred_vector_idx = [0,1,2,3,4,5,6,7,8,9]
  pred_vector_CNN = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
  pred_vector_DNN = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
  CNN_max = { "probability" : 0, "number" : 0};
  DNN_max = { "probability" : 0, "number" : 0};

  constructor(
    public gridmng : GridManager,
    private http : HttpClient,
    public WSM : WindowSizeManager) { }

  ngOnInit(): void {
    this.gridmng.setGridsize(28)
  }

  predict(){
    let Griddata = this.gridmng.getGridArr()
    this.CNN_max = { "probability" : 0, "number" : 0};
    this.DNN_max = { "probability" : 0, "number" : 0};
    let data = {
      "data": Griddata
    }
    this.http.post(environment.MNIST_CLASSIFIER,data)
    .pipe(map(res => {  // Rounding pipe
      let CNN_pred = []
      let DNN_pred = []
      for (let idx in res["pred_vector_CNN"][0]){
        let prob_CNN = Math.round(res["pred_vector_CNN"][0][idx]*100) / 100
        let prob_DNN = Math.round(res["pred_vector_DNN"][0][idx]*100) / 100

        if (prob_CNN*100 > this.CNN_max["probability"]){
          this.CNN_max = { "probability" : prob_CNN*100, "number" : Number(idx)}
        }

        if (prob_DNN * 100 > this.DNN_max["probability"]){
          this.DNN_max = { "probability" : prob_DNN * 100, "number" : Number(idx)}
        }

        CNN_pred.push(prob_CNN)
        DNN_pred.push(prob_DNN)
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
