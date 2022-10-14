const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

//UPLOADING IMAGES

//const road = new Image();
//road.src = "./images/road.png"
const car = new Image();
car.src = "./images/car.png";
let score =0

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
}
// Starting the game

function startGame() {
let car = new Car
car.drawCar() 
let obstacles = new Obstaculo

document.addEventListener ("keydown", (e)=>{
 console.log(e);
  if (e.keyCode === 37){
    car.moveLeft()
    car.drawCar()
  } else if (e.keyCode === 39){
    car.moveRight()
    car.drawCar()
  }
  })


const update = () => {

ctx.clearRect (0,0,canvas.width,canvas.height)

car.drawCar()
drawScore()
drawObstaculo()
updateObstaculo()
obstaculosArray.forEach((ele)=>{
if (checkCollitions(ele,car)){
  //console.log ("touched")
  drawGameOver ()
  endGame()
}
})
requestAnimationFrame(update)
}
requestAnimationFrame(update)

}

class Car{
constructor (){
 
  this.X = (canvas.width/2)-25
  this.Y = 630
  this.speedX=1
  this.width = 50
  this.height = 70
  this.stopGame = false
}
  drawCar(){
  ctx.drawImage(car,this.X,this.Y,this.width,this.height)
  }

  moveLeft (){
    if(this.X<=75||this.stopGame=== true ){
    return
    }
    this.X-=this.width
  }
    
  moveRight (){
    if(this.X>=canvas.width-car.width||this.stopGame=== true ){
     return
    }
    this.X+=this.width
  }
}
  
class Obstaculo {
  constructor (){
    this.X = Math.random ()*canvas.width/2
    this.Y = 0
    this.speed=4
    this.width = 50
    this.height = 20
    this.stopGame=false
  }
    drawObstaculo(){
      ctx.fillStyle = "red"
      ctx.fillRect(this.X,this.Y+=1,this.width,this.height)
    }
    contains(b){
      return (this.X < b.X + b.width) &&
        (this.X + this.width > b.X) &&
        (this.Y < b.Y + b.height) &&
        (this.Y + this.height > b.Y)
    }
  }
  
let obstaculosArray = []

const createObstaculo = setInterval(()=> {
  obstaculosArray.push(new Obstaculo())
},3000)

const updateObstaculo = ()=>{
  obstaculosArray.forEach ((Obstaculo)=>{
   Obstaculo.speed =2
   if (!Obstaculo.stopGame) {
   Obstaculo.Y+=Obstaculo.speed
    }
  })
}
    const drawObstaculo = ()=>{
      obstaculosArray.forEach ((Obstaculo)=>{
        ctx.fillRect(Obstaculo.X,Obstaculo.Y,Obstaculo.width,Obstaculo.height)
        })
}

const checkCollitions = (obs,b) => {
return (obs.contains(b))
}

const drawScore=()=>{
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(score,canvas.width/2,200);
}

const drawGameOver=()=>{
  let gameOver= "Game Over!"
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(gameOver,100,100)
}

const endGame = () => {
  car.stopGame=true

}
