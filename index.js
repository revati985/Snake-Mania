/*GAME CONSTANTS AND VARIABLE */

let inputdir={x:0, y:0};       
const eat= new Audio('music/eat.wav');
const gamestart = new Audio('music/gamestart.mp3');
const gameover = new Audio('music/gameover.mp3');
const move= new Audio('music/move.mp3');
const music=new Audio('music/music.mp3');
let speed=5;
let lastPaintTime=0;    //screen is only rendered again after 0.5 seconds (1/2)
let snakearr=[         
    {x: 13,y: 15}       //snake is an array with initial position 13,15
]       
food= {x:4,y:8};
let score=0;

//GAME FUNCTION
//MAIN : GAME LOOP

function main(ctime){                         //current time
    window.requestAnimationFrame(main);
    // console.log(ctime);  //the duration of the code block or operation(continous),need to be set a limit/boundary  
    if((ctime-lastPaintTime)/1000 < 1/speed){    //rendering time: whole screen reshowing time
        return;    //no need to render again rn: before 0.5 sec
    }
    lastPaintTime=ctime;  //updating ctime
    gameEngine();            //runs the main game
}

function iscollide(snake){
    //snakes head(0,0) collides with its own body segment  -> 1 case
    for(let i=1;i<snakearr.length;i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            return true; }
    }
    //snake head collides with wall (0X18) -> 2 case
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y<=0 || snake[0].y>=18){
        return true;  }
}

function gameEngine(){

    //update snake and food-1

    if(iscollide(snakearr)){
        gameover.play();
        music.pause();
        inputdir={x: 0,y: 0};
        alert("Game Over! press any key to play again.");
        snakearr=[{x:13,y:15}];
        gamestart.play();
        score=0;
        speed=5;
    }
    //snake eaten: increament score and also regenerate food
    //head of snake: arr[0] and food collide--> add food to head: body size increases
    if(snakearr[0].x==food.x && snakearr[0].y==food.y){   
        //update snake size afer eating
        eat.play();
        score +=1;
        speed +=0.35;
        const scoreBox = document.getElementById("scoreBox");
        scoreBox.innerHTML="Score: "+score;
        
        snakearr.unshift({x: snakearr[0].x+ inputdir.x, y: snakearr[0].y+ inputdir.y });

        //regenerate food (grid=18X18) -randomly
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }     
    //moving snake on board
    //starting from last second segment of snake to shift it one step ahead and storing it in new 
    for(let i=snakearr.length -2; i>=0; i--){    
        snakearr[i+1]={...snakearr[i]};       //last seg (i+1) comes one step forward after eating
    }                                        //all segments and head stored in one specific designated initializer
    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;

    //display snake and food-2

    //display snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{    //iterating over snakearr and executing function for each element
        snakeEle= document.createElement('div');    //making an element for snake in div
        snakeEle.style.gridRowStart=e.y;         //y:rows ,e: element of snakearr
        snakeEle.style.gridColumnStart=e.x;
        if(index==0){
            snakeEle.classList.add('head');
        }
        else{
            snakeEle.classList.add('snake');
        }
        board.appendChild(snakeEle);

    });

    //display food
    foodEle= document.createElement('div');    //making an element for snake in div
    foodEle.style.gridRowStart=food.y;         //y:rows
    foodEle.style.gridColumnStart=food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);
}

//MAIN LOGIC- LOCAL STORAGE

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    
    music.play(); 
    inputdir={x:0,y:1};     //start game
    move.play();
    switch (e.key) {                      //origin: top left most corner
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x= 0;
            inputdir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x= 0;
            inputdir.y= 1; 
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x= -1;
            inputdir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x= 1;
            inputdir.y= 0;
            break;
        default:
            break;
    }
});

//HIGH SCORE UPDATE

// if(score>hiscoreval){
//     hiscoreval=score;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
//     hiscoreBox.innerHTML="High score: "+ hiscoreval;
// }


// let hiscore= localStorage.getItem("hiscore");
// let hiscoreval;
// const hiscoreBox = document.getElementById("hiscoreBox"); //get high score from storage
// if(hiscore==null){    
//     hiscoreval = 0;   //high score value
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))  //set high score
// }
// else{
//     hiscoreval= JSON.parse(hiscore);   //JSON.parse(!empty) convert JSON string to number
//     hiscoreBox.innerHTML= "High Score:" + hiscoreval;
// }
