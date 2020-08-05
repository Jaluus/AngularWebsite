export class Node {
  constructor(
    public x : number,
    public y : number,
    public role : string,
    public gCost : number = Infinity,
    public hCost : number = Infinity,
    public color : string = "transparent")
    {}

  getFCost(){
    return this.gCost + this.hCost;
  }
}
