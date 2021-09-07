class Pacman {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.height = 15
    this.width = this.height
    this.speedX = 0
    this.speedY = 0
    this.speed = {x:0,y:0}

  }
  display() {
    push();
    fill("yellow");
    circle(this.x, this.y, this.height);
    pop(); 
  this.x += this.speed.x
  this.y += this.speed.y
  
  }

}
