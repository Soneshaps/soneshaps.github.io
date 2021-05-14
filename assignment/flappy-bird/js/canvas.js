var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var cnvHeight = canvas.height;
var cnvWidth = canvas.width;
//Sprite Image 
var sprite = new Image();
sprite.src = "image/sprite.png";
//Score and High Score 
score = 0;
highScore = localStorage.getItem('highScore') || 0;