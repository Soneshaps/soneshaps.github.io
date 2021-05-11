function Carousel(){
    let carousel = this ;


    this.container = document.querySelector(".carousel-container");
    this.wrapper = document.querySelector(".carousel-image-wrapper");
    this.images = this.wrapper.getElementsByTagName("img");

    //Styling Container
    this.container.style.overflow = "hidden";
    this.container.style.position = "relative"
    
    // Styling Container

    //Width of image wrapper is equal to container width * image number
    this.wrapper.style.width = this.container.clientWidth * this.images.length +'px';
    
    this.wrapper.style.height = '100%';
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.left = '0';

    //Creating Left Button    
    this.leftButton = document.createElement('div');
    
    //Styling Left button
    this.leftButton.style.position = 'absolute';
    this.leftButton.style.left = '0';
    this.leftButton.style.zIndex = '99';
    this.leftButton.style.width = '15%';
    this.leftButton.style.height= '100%'; 
    this.leftButton.style.cursor = "pointer"   

    //Adding Left Button Div to the Document
    this.container.appendChild(this.leftButton);

    //Creating , Styling and adding img to the Left Div Button
    this.leftButtonImg = document.createElement('img');
    this.leftButtonImg.src = 'images/left.svg';
    this.leftButtonImg.style.width = '50%';
    this.leftButtonImg.style.position = "absolute";
    this.leftButtonImg.style.top = '45%';
    this.leftButtonImg.style.left = '25%';
    this.leftButton.appendChild(this.leftButtonImg);
    this.leftButton.addEventListener("click", function(){
        console.log("Left Click!")
        carousel.goLeft();
    });
    
    //Creating Left Button    
    this.rightButton = document.createElement('div');
    
    //Styling Left button
    this.rightButton.style.position = 'absolute';
    this.rightButton.style.right = '0';
    this.rightButton.style.zIndex = '99';
    this.rightButton.style.width = '15%';
    this.rightButton.style.height= '100%'; 
    this.rightButton.style.cursor = "pointer"
    this.rightButton.addEventListener("click", function(){
        console.log("Right Click!")
        carousel.goRight();
    });   

    //Adding Left Button Div to the Document
    this.container.appendChild(this.rightButton);

    //Creating , Styling and adding img to the Left Div Button
    this.rightButtonImg = document.createElement('img');
    this.rightButtonImg.src = 'images/right.svg';
    this.rightButtonImg.style.width = '50%';
    this.rightButtonImg.style.position = "absolute";
    this.rightButtonImg.style.top = '45%';
    this.rightButtonImg.style.left = '25%';
    this.rightButton.appendChild(this.rightButtonImg);

    for (let i=0; i<this.images.length; i++){
        this.images[i].style.width = this.container.clientWidth+'px';
        this.images[i].style.height = '100%'
        this.images[i].style.float = 'left';
    }

    //pagination bottom
    this.paginationContainer = document.createElement('div');
    this.paginationContainer.style.position = "absolute";
    this.paginationContainer.style.bottom = '10px';
    this.container.appendChild(this.paginationContainer);

    //Creating bullet function and styling for bullet 
    this.createBullet= function(index){
        this.paginationbutton = document.createElement('div');
        this.paginationbutton.style.float = 'left';
        this.paginationbutton.style.borderRadius = '50%';
        this.paginationbutton.style.height = '15px';
        this.paginationbutton.style.width = '15px';
        carousel.paginationbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        this.paginationbutton.style.margin = '0 2px';
        this.paginationContainer.appendChild(this.paginationbutton);
        this.paginationbutton.addEventListener('click', function(){
            carousel.goTo(index);
          });
        this.createBulletHover(carousel.paginationbutton)

    }

    this.createBulletHover = function(paginationbutton,index){
        paginationbutton.addEventListener("mouseover", function(){
            paginationbutton.style.backgroundColor = 'rgb(255, 255, 255)';
            paginationbutton.style.cursor = 'pointer';
        });
        paginationbutton.addEventListener("mouseout", function(){
            paginationbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            carousel.bulletStatus(carousel.newPosition)
        });
      }

    //Creating number of bullets i.e euqals to image number
    for (var i=0; i<this.images.length; i++){
        this.createBullet(i);
      }

    //Centering the pagination container  
    this.paginationContainer.style.left = `calc(50% - ${(this.paginationContainer.clientWidth / 2) +'px'})`;

    //Right Button Function
    this.initalPosition = 0
    this.newPosition = 0 
    this.buttonStatus = '';
    let previousPosition = 0
    this.previousBullet = 0   
    this.goRight = function(){
         previousPosition = carousel.newPosition
         carousel.initalPosition = carousel.newPosition
         carousel.buttonStatus = 'right'
         carousel.slideRight()   
    }

    this.goLeft = function(){
        previousPosition = carousel.newPosition
        carousel.initalPosition = carousel.newPosition
        carousel.buttonStatus = 'left'
        carousel.slideLeft()   
    }

    this.goTo = function(page){
        previousPosition = carousel.newPosition
        carousel.pageIndex = page 
        carousel.pageStatus = page*carousel.container.clientWidth

        console.log(carousel.newPosition,carousel.pageStatus)
        if(carousel.pageStatus > carousel.newPosition){
            carousel.newPosition = carousel.pageStatus
            console.log(carousel.newPosition)
            carousel.buttonStatus = 'right'
        }else{
            carousel.newPosition = carousel.pageStatus
            carousel.buttonStatus = 'left'
        }
        carousel.animate();
    }


    this.bulletStatus = function(index){
        var buttons = carousel.paginationContainer.getElementsByTagName('div');
        carousel.buttonIndex = (index * carousel.images.length / carousel.wrapper.clientWidth)
        console.log(carousel.buttonIndex)
        for (let bulletBottomIndex = 0; bulletBottomIndex < carousel.images.length; bulletBottomIndex++) {
            buttons[bulletBottomIndex].style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        }
        if(index === undefined || 0){
            buttons[0].style.backgroundColor = '#000000'
        }else{
            buttons[carousel.buttonIndex].style.backgroundColor = '#000000'
        }
    }
    this.bulletStatus()

    this.slideWidth = this.wrapper.clientWidth / this.images.length
    this.maxWidth = this.wrapper.clientWidth - this.slideWidth

    this.slideRight = function(){
        if(carousel.initalPosition === carousel.maxWidth){
            carousel.newPosition = 0
            // carousel.wrapper.style.left = carousel.newPosition
        }else{
            carousel.newPosition = carousel.newPosition + carousel.slideWidth
            // carousel.wrapper.style.left = -(carousel.newPosition)+'px' 
        }
        carousel.animate();
    }
    this.slideLeft = function(){
        if(carousel.initalPosition === 0){
            carousel.newPosition = carousel.maxWidth
            console.log(carousel.maxWidth)
            // carousel.wrapper.style.left = -(carousel.newPosition)+'px' 
        }else{
            carousel.newPosition = carousel.newPosition - carousel.slideWidth
            // carousel.wrapper.style.left = -(carousel.newPosition)+'px' 
        }
        carousel.animate();
    }




    this.animate = function(){
        let dx = 0
        let temPosition;
        let animateInterval
            if(carousel.buttonStatus === "right"){
                 animateInterval = setInterval(function(){
                    if(temPosition === carousel.newPosition){
                        clearInterval(animateInterval)
                    }
                    if(carousel.newPosition === 0){
                        carousel.wrapper.style.left = -(temPosition)+'px'
                        temPosition = previousPosition - dx
                        dx += 100
                    }else{
                        carousel.wrapper.style.left = -(temPosition)+'px'
                        temPosition = previousPosition + dx
                        dx += 100
                    }
                }, 200);
            }
            if(carousel.buttonStatus === "left"){
                 animateInterval = setInterval(function(){
                    if(temPosition === carousel.newPosition){
                        clearInterval(animateInterval)
                    }
                    if(carousel.newPosition === carousel.maxWidth){
                        carousel.wrapper.style.left = -(temPosition)+'px'
                        temPosition = previousPosition + dx
                        dx += 100
                    }else{
                        carousel.wrapper.style.left = -(temPosition)+'px'
                        temPosition = previousPosition - dx
                        dx += 100
                    }
                }, 200);
            }     
        carousel.bulletStatus(carousel.newPosition)    
    }

}

var carouselWidow = new Carousel();
