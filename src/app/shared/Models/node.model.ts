export class Node {
  constructor(
    public x : number,
    public y : number,
    public role : string,
    public gCost : number = Infinity,
    public hCost : number = Infinity,
    public parent : Node = null)
    {}

  getFCost(){
    return this.gCost + this.hCost;
  }

  reset(){
    this.role = "none"
    this.gCost = Infinity
    this.hCost = Infinity
    parent = null;
  }
}
