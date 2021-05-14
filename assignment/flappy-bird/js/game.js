class Game{
    constructor(context){
        this.context = context;
        this.background = new Background();
        this.ground = new Ground();
        this.bird = new Bird();
        this.pipes = new Pipes()


        this.gameState = 0
        this.gameClock = 0
    }
    //Game state = 0 --> Main Menu
    //Game state = 1 --> Game On
    //Game state = 3 ---> Game Over   
    
    update(){
        //If game state is on Or in main menu 
        if(this.gameState < 2){
            this.checkGroundCollision()
            this.gameClock += 1
            this.background.update(this.context);
            this.ground.update(this.context);
            this.bird.update(this.context);
            if(this.gameClock % 5 === 0){
                this.bird.flap()
            }
            if (this.gameClock % 100 == 0){
                this.pipes.addPipes()
            }
            this.pipes.update(this.context);
            this.displayScore()

        }
        if(this.gameState===2){
            stop();
        }

    }
    MainMenu(){
        if(this.gameState===0){
            let position = {sX : 175,
                sY : 390,
                w : 225,
                h : 200,
                x : cnvWidth/2 - 225/2,
                y : 200}
                this.context.drawImage(sprite, position.sX, position.sY, position.w, position.h, position.x, position.y, position.w, position.h);
        }
    }

    gameOver(){
        // Comapre High Score with score 
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore)
          }
        // If game is over
        if(this.gameState === 2){
            let position = {sX : 175,
                sY : 228,
                w : 225,
                h : 170,
                x : cnvWidth/2 - 225/2,
                y : 90}
              this.context.drawImage(sprite, position.sX, position.sY, position.w, position.h, position.x, position.y, position.w, position.h);
              this.context.fillStyle = "#FFF";
              this.context.strokeStyle = "#000";
              this.context.font = "25px arial";
              this.context.fillText(score, 225, 185);
              this.context.fillText(highScore, 220, 228);                   
        }
    }

    //Ground and Top Collision 
    checkGroundCollision(){
        if (this.bird.y<0){
            this.gameState = 2
        }
        if (this.bird.y+ this.bird.height>this.ground.y){
            this.bird.y = cnvHeight - this.ground.height - this.bird.height;
            this.gameState = 2
        }
    }
    //Score
    displayScore(){
        this.context.fillStyle = "#FFF";
        this.context.strokeStyle = "#000";
        this.context.font = "35px Arial";
        this.context.lineWidth = 1;
        this.context.fillText(score, cnvWidth/2, 50);
        this.context.strokeText(score, cnvWidth/2, 50);
    }
    //Pipe collision 
    checkPipeCollision(){
        for(let i = 0; i < this.pipes.position.length; i++){
            let p = this.pipes.position[i];
            let bottomPipeYPos = p.y + this.pipes.height + this.pipes.gap;
            if(this.bird.x + 2 * this.bird.radius > p.x 
                && this.bird.x < p.x + this.pipes.width 
                && this.bird.y + 2 * this.bird.radius > p.y 
                && this.bird.y < p.y + this.pipes.height){
                this.gameState = 2;
            }
            if(this.bird.x + 2 * this.bird.radius > p.x 
                && this.bird.x < p.x + this.pipes.width 
                && this.bird.y + 2 * this.bird.radius > bottomPipeYPos
                && this.bird.y< bottomPipeYPos + this.pipes.height){
                    this.gameState = 2;
                }
        }
    }
}

let game = new Game(context)


//If space is pressed
document.addEventListener('keydown',function(event){
    if(event.keyCode === 32){
        game.bird.jump()
    }
    
});

//If clicked on canvas
canvas.addEventListener("click", function(evt){
    switch(game.gameState){
        case 0:
            game.gameState = 1;
            break;
        case 1:
            game.bird.jump();
            break;
        case 2:
            game.gameState = 0;
            game.bird.y = 137;
            game.bird.speed = 0; 
            game.pipes.position = [];
            score = 0;
            break;
    }
});

function run(){
    game.update()
    game.gameOver()
    game.MainMenu()
    requestAnimationFrame(run);
}

run();
