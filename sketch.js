var ball1;
var pos;
var database;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball1 = createSprite(this.x,this.y,10,10);
    this.x = 250;
    this.y = 250;
    ball1.shapeColor = "red";
    var ball1pos = database.ref('ball/position');
    ball1pos.on('value',readPosition,showError);
}

function draw(){
    //background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : pos.x + x,
        'y' : pos.y + y
    })
}

function readPosition(data){
    pos = data.val();
    ball1.x = pos.x;
    ball1.y = pos.y;
}

function showError(){
    console.log(pos);
}
function keyPressed(){
   if(keyCode === 32){
      var rC = '#'+ Math.floor(Math.random()*16777215).toString(16);
      ball1.shapeColor = rC;
   }
   if(keyCode === 67){
       background(255);
   }
}