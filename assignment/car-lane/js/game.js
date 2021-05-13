class Game{
    constructor(context){
        this.context = context;
        this.y = 0;
        this.road = new Image;
        this.road.src = './images/road.png';
        this.speed = 10;
        
        this.userCar = new PlayerCar();
        
        this.traffic = [];
        this.trafficSpeed = 3;
        this.gameStatus = false;

        this.clock = 0 ;
        this.carClock = 0 ;
        this.carSpawnTime = 130;
    }

    update=()=>{
        if(!this.gameStatus){
            if(this.y>650){
                this.y = 0;
            }
            this.context.drawImage(this.road, 0, this.y, 450, 650);
            this.context.drawImage(this.road, 0, this.y - 650, 450, 650);
            this.y += this.speed;
            
            this.traffic.forEach(function(car){
                car.update(context)
                if(car.y >650){
                    score += 1 ;
                    removeCar(car);
                    scoreBoard.innerHTML = `Score : ${score}`;
                }
            })
            
            if(collision(this.userCar, this.traffic).detected){
                this.gameStatus = true;
                
                let tryAgainScreen = document.querySelector('.try-again');
                tryAgainScreen.style.display = 'block';
                let playerScoreBoard = document.querySelector('.player-score');
                playerScoreBoard.innerHTML = 'SCORE : ' + score;
                scoreBoard.style.display = 'none';
                if(score > 1 ){
                    console.log('yo')
                    if(!localStorage.score){
                        localStorage.setItem("score", score);
                    }else{
                        if(localStorage.score < score){
                            localStorage.setItem("score",score);
                        }
                        
                    }
                }
            }
            
            this.clock += 1 ;
            this.carClock += 1;
            if(this.tick > 650){
                this.clock = 0;
                this.speed += 1;
                this.trafficSpeed += 1;
                if (this.carSpawnTime > 50) {
                    this.carSpawnTime -= 20;
                    this.traffic.forEach(function(car){
                        car.increaseSpeed();
                    })
                }
            }
            if(this.carClock > this.carSpawnTime){
                this.carClock = 0;
                this.populateTraffic();
            }
           
    
            this.userCar.update(this.context);
        }
    }

    populateTraffic=()=>{
        var trafficCar = new Traffic(this.trafficSpeed);
        this.traffic.push(trafficCar);
        trafficCar = new Traffic(this.trafficSpeed);
        this.traffic.push(trafficCar);
    }
      
    

}

canvas = document.getElementById("canvas");
let context = canvas.getContext('2d')
let game = new Game(context);
let score = 0;
let tryAgainScreen = document.querySelector('.try-again');
let scoreBoard = document.querySelector('.score-board');
let highScore = document.querySelector('.high-score');
let homeScreen = document.querySelector('.home-screen');
let playButton = document.querySelector('.play-button');
let tryAgainButton = document.querySelector('.try-again-button');

playButton.addEventListener('click', function(){
    highScore.style.display = "block";
    
    if(!localStorage.score){
        highScore.innerHTML = "N/A";
    }else{
        highScore.innerHTML = localStorage.score;
    }
    homeScreen.style.display = 'none';
    gameLoop()
})

function removeCar(car){
    game.traffic = game.traffic.filter(item => item !==car);
}

function gameLoop(){
    game.update();
    requestAnimationFrame(gameLoop);
}

tryAgainButton.addEventListener('click', function(){
    score = 0;
    scoreBoard.innerHTML = 'Score : ' + score;
    scoreBoard.style.display = 'block';
    game.traffic = [];
    game.userCar.resetPosition();
    game.gameStatus = false;
    game.carSpawnTime = 130;
    tryAgainScreen.style.display = 'none';
    highScore.innerHTML = localStorage.score;
})

function collision(object, traffic){
    let collided ={detected : false, cars: []} 
    for(i = 0; i <traffic.length; i++){
      if (object.position.x < traffic[i].position.x + traffic[i].position.width &&
        object.position.x + object.position.width > traffic[i].position.x &&
        object.position.y < traffic[i].position.y + traffic[i].position.height &&
        object.position.y + object.position.height > traffic[i].position.y) {
          collided.detected = true;
          collided.cars.push(traffic[i]);
      }
    }
    return collided
}

document.addEventListener('keydown', function(key){
    if(key.key === 'ArrowLeft'){
        game.userCar.userCarLeft();
    }
    if(key.key === 'ArrowRight'){
        game.userCar.userCarRight();
    }
})