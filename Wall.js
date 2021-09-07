class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
  display() {
    fill("blue");
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}
