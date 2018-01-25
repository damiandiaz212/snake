//javascript snake
//by Damian Diaz
//1/14/2018

var scl = 20;
var speed = 1;
var snake;
var food;


function setup() {
	
	createCanvas(500, 500);
	snake = new Snake();
	frameRate(15);
	placeFood();

}

function draw() {

	
	background(21);

	textSize(40);
	fill(100, 100, 100);
	text('snake', width/2 - 50, (height/2) - 50);

	textSize(15);
	fill(100, 100, 100);
	text('by damian', width/2 - 15, (height/2) - 40);
	
	snake.update();
	snake.show();
	snake.death();
	
	if(snake.eat(food)){
		placeFood();
	}


	fill(256, 0 , 0);
	noStroke();
	rect(food.x, food.y, scl, scl);

	textSize(32);
	text(snake.total, width - 50, height -20);


}

function reset(){
	
	location.reload();

}



function placeFood(){

	
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);

	

}

function keyPressed(){

	if(keyCode === 87 || keyCode == UP_ARROW){
		snake.dir(0, speed * -1);
	}else if(keyCode === 83 || keyCode == DOWN_ARROW){
		snake.dir(0, speed);
	}else if(keyCode === 68 || keyCode == RIGHT_ARROW){
		snake.dir(speed, 0);
	}else if(keyCode === 65 || keyCode == LEFT_ARROW){
		snake.dir(speed * -1, 0);
	}

}
function Snake(){
	
	this.x=0;
	this.y=0;

	this.xspeed=1;
	this.yspeed=0;

	this.total = 0;
	this.tail = [];

	this.eat = function(pos){
		
		var distance = dist(this.x, this.y, pos.x, pos.y);

		if(distance <= 1){
			this.total ++;
			return true;
		}else{
			return false;
		}
	}

	this.death = function(pos){
		
		for(var i = 0; i < this.tail.length; i++){
			
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			
			if(d < 1){
				this.total = 0;
				this.tail = [];
				reset();
			}

		}

	}

	this.dir = function(x,y){
		this.xspeed=x;
		this.yspeed=y;
	}
	
	this.update = function(){


		for(var i = 0; i < this.tail.length-1; i++){
			this.tail[i] = this.tail[i+1];
		}
		
		if(this.x > width){
			this.x = 0;
		}else if(this.x < 0){
			this.x = width;
		}

		if(this.y > height){
			this.y = 0;
		}else if(this.y < 0){
			this.y = height;
		}
		
		
		if(this.total >= 1){
			this.tail[this.total - 1] = createVector(this.x, this.y);
		}
		
		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;

		//this.x = constrain(this.x, 0, width - scl);
		//this.y = constrain(this.y, 0, height - scl);

	}

	this.show = function(){
		
		fill(255);

		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		rect(this.x, this.y, scl, scl);

	}

	
}