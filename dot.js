class Dot {
  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = this.height
  }
  display() {
    fill("white");
    circle(this.x, this.y, this.height);
  }
}
