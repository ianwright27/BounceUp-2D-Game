var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 650;
canvas.height =440;
var gameLost = false;
var r = 10;
var bX = Math.floor(Math.random()*300); 
var bY = Math.floor(Math.random()*100);
var bW = bH = 10; 
var bxV = 7;
var byV = 7;
var pX = 350;
var pY = 400;
var pW = 150;
var pH = 40; 
var pxV = 2;
var pyV = 2;
var Score = 0;
var gameOverText = "";
window.addEventListener('mousemove', function(e){
	  pX = e.clientX;
})
var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#ecf0f1',
	'#3498db',
	'#2980b9'
]
maxRadius = 5;
minRadius = 1;
function Circle(x,y, dx, dy, radius){
this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	this.update = function(){
		if(this.x+ this.radius >innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}
		if(this.y+ this.radius > innerHeight || this.y+ this.radius < 30){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		if(bX - this.x < 50 && bX - this.x > -50 && bY - this.y < 50 && bY - this.y > -50){
			if(this.radius < maxRadius){
				this.radius +=1;
			}
		}else if(this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.draw();
	}
}
function init(){
	circleArray = [];
	for(var i = 0 ; i < 1000; i++) {
		var radius = Math.random()*2 +1;
		var x = Math.random()*(innerWidth-radius*2)+radius;
		var dy = (Math.random()*0.5);
		var y = Math.random()*(innerHeight-radius*2)+radius;
		var dx = (Math.random()*0.5);;
		circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}
init();
function loop(){
	var repeat = requestAnimationFrame(loop);
	c.clearRect(0,0, canvas.width, canvas.height);
	c.beginPath();
	c.moveTo(0,0)
	c.fillStyle = "#fff";
	c.arc(bX, bY, r, 0, Math.PI*2, false);
	c.fillStyle = "#2c3e50";
	c.fill();
	c.fillStyle= "#2c3e50";
	c.fillRect(pX, pY, pW, pH);
	c.fillTextStyle = "red";
	c.font = "28px sans-serif"
	c.fillText("Score :"+parseInt(Score),canvas.width-150, 40);
	if(bX+r>canvas.width || bX<0){
		bxV = -bxV;
	}
	if(bY<0){
		byV = -byV;
	}
	if(pX+pW>canvas.width || pX<0){
		pxV = 0;
	}
	if(pY<0){
		pyV = 0;
	}
	if(bY > canvas.height){
		gameLost = true;
			if(gameLost == true){
				gameEnd();
			}
	}
function gameEnd(){
	cancelAnimationFrame(repeat);
		window.addEventListener('click', function(){
			window.location = 'index.html'; 
		})
}
	var offSetRight = pX+pW;
	if(bY+r*2 > canvas.height-pH && bX > pX && bX < offSetRight){
		byV = -byV;
		Score += 10;
	}
	bX += bxV;
	bY += byV;

	for(var i  = 0; i<circleArray.length; i++){
		circleArray[i].update();	
	}
}
loop();
