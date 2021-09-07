class Ghost {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.height = 15;
    this.width = this.height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    
    this.speed = { x: 0, y: -SPEED };
  }
  display() {
    push();
    fill(this.color);
    circle(this.x, this.y, this.height);
    pop();
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  
}
