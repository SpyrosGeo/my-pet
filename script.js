console.log('script loaded')
const canvas = document.getElementById("canvas1")
const animation = document.getElementById("animation")
let selectedAnimation = animation.value
const ctx = canvas.getContext("2d")




let animations = {
    idle:{frames:6,staggerFrame:3,positionY:0},
    jump:{frames:6,staggerFrame:2,positionY:1},
    run:{frames:8,staggerFrame:3,positionY:3},
    dizzy:{frames:10,staggerFrame:3,positionY:4},
    sit:{frames:4,staggerFrame:5,positionY:5},
    playDead:{frames:11,staggerFrame:4,positionY:8,stopFrames:true}

}
animation.addEventListener('change',(event)=>{
    selectedAnimation = event.target.value
})
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteWidth = 575; 
const spriteHeight =523;
const background = new Image()
const petImage = new Image();
petImage.src = 'shadow_dog.png'
background.src= 'background.jpeg'

let frameX = 0;
let gameFrame = 0;



function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    // ctx.fillRect(50,50,100,100)
    // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
    ctx.drawImage(background,0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    ctx.drawImage(petImage,frameX * spriteWidth, animations[selectedAnimation].positionY * spriteHeight, spriteWidth,
                spriteHeight,0,0,spriteWidth,spriteHeight);
        if(gameFrame % animations[selectedAnimation].staggerFrame ==0){
        if(frameX< animations[selectedAnimation].frames) frameX++
        else frameX=0;
        }
  
        gameFrame++;
    requestAnimationFrame(animate)
}
animate()
