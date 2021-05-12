function Ball(container,color){
        this.container = container
        this.radius = Math.floor(Math.random() * 3) + 3;
        this.x = Math.floor(Math.random() * (1000 - (2 * this.radius)));
        this.y = Math.floor(Math.random() * (600 - (2 * this.radius)));
        this.dy = Math.floor(Math.random() * 5)+1;
        this.dx = Math.floor(Math.random() * 5)+1;
        this.color = color;
        this.ball = container.getContext("2d")


        this.draw = function(){
        this.ball.beginPath();
        this.ball.arc(this.x, this.y, this.radius, 0, 2 * Math.PI,false);
        this.ball.fillStyle = this.color;
        this.ball.fill();
        }.bind(this)

        this.handleBorderCollision = function() {
            if (this.x > (1000 - this.radius*2)){
              this.dx = -Math.abs(this.dx);
            }
            if (this.x < 0){
              this.dx = Math.abs(this.dx);
            }
            if (this.y > (600 - this.radius*2)){
              this.dy = -Math.abs(this.dy);
            }
            if (this.y < 0){
              this.dy = Math.abs(this.dy);
            }
        }.bind(this)

        this.setDirection=function(dxNew, dyNew){
            this.dx = dxNew;
            this.dy = dyNew;
        }.bind(this)

        this.increasepositon=function(){
            this.x += 1;
            this.y += 1;
          }.bind(this)

        this.direction=function(){
            return [this.dx, this.dy];
          }.bind(this)

        this.position=function(){
            return {radius: this.radius, x: this.x, y: this.y};
        }.bind(this)

        

        this.move = function(){
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }.bind(this)


}

var canvas = document.querySelector("canvas");
let ballNo = 800
let balls = []
var ball
function genrateRandomColor(){
    color = '#';
    for (let i= 0; i < 6; i++)
      color = color + Math.floor(Math.random() * 10);
    return(color)
}

function handleBallCollision(){
    for (i = 0; i < ballNo; i++){
      for (j = i; j < ballNo; j++){
        if (i !== j){
          if(detectCollision(balls[i].position(), balls[j].position()))
          {
            let tempI = balls[i].direction();
            let tempJ = balls[j].direction();
            balls[i].setDirection(tempJ[0], tempJ[1]);
            balls[j].setDirection(tempI[0], tempI[1]);
            
          }
        }
      }
    }
}

function detectCollision(circle1, circle2){
    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < circle1.radius + circle2.radius) {
        return(true)
    }
}


for (i = 0; i < ballNo; i++){ 
    overlap = false;
    do{
      overlap = false;
       ball =  new Ball(canvas, genrateRandomColor());
      for (let j = 0; j < i; j++)
        if (detectCollision(ball, balls[j])){
          overlap = true;
          break;  
        }
    }while(overlap)
    ball.draw();
    balls.push(ball);
}  


function run(){
    ball.ball.clearRect(0, 0, 1000, 600);
    for (i = 0; i < ballNo; i++){ 
      balls[i].move();
      balls[i].handleBorderCollision()
    }
    handleBallCollision()
    requestAnimationFrame(run);
  }
  run();