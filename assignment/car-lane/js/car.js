class Traffic{
    constructor(speed){
      this.car = new Image;
      this.trafficCarImgs = ['./images/carBlue.png','./images/carGreen.png','./images/carOrenge.png','./images/carRed.png'];
      this.carNo = Math.round(Math.random() * (this.trafficCarImgs.length-1));
      this.lane = Math.round(Math.random() * 2);
      this.y = -150;
      this.speed = speed;
    }
    
    update(ctx){
      this.car.src = this.trafficCarImgs[this.carNo];
      ctx.drawImage(this.car, this.lane * 90 + 100, this.y, 70, 150);
      this.y += this.speed;
      
      
    }
   
    
    get position(){ 
      return {x: this.lane * 90 + 100, y: this.y, width: 70, height: 150}
    }
    increaseSpeed(){
      this.speed += 3;
    }
  }