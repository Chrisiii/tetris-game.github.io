  
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreElem = document.getElementById("scorea");
const speedElem = document.getElementById("speed");
const canvasNext = document.getElementById('square3');
const ctxNext = canvasNext.getContext('2d');

let canMove = true;
let speed = 500;
let dropStart = Date.now();
let score = 0;
let mySound;



const defaultColor = "black";
const ROW = 20;
const SQ = 20;
const COL = 15;

function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

let board = [];
for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = defaultColor;
    }
}

function drawBoard(){
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
    scoreElem.innerHTML = score;
    speedElem.innerHTML = speed;
}

drawBoard();
  const iPiece = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
];

const jPiece = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
];

const lPiece = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
];

const oPiece = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];

const sPiece = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
];

const tPiece = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
];

const zPiece = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],
];

const allPieces = [
    [zPiece, '#3bc100'],
    [sPiece, '#00d8ff'],
    [iPiece, '#6000ff'],
    [lPiece, '#ff1e00'],
    [jPiece, '#004eff'],
    [tPiece, '#deff00'],
    [oPiece, '#e713e0'],
];

class Piece {
    constructor(piece,color){
        this.piece = piece
        this.color = color

        this.pieceNumber = 0
        this.activePiece = this.piece[this.pieceNumber]

        this.x = 6
        this.y = -2
    }

    fill(color) {
        for (let r = 0; r< this.activePiece.length; r++) {
            for(let c = 0; c < this.activePiece.length; c++) {
                if (this.activePiece[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw(){
        this.fill(this.color);
    }

    unDraw(){
        this.fill(defaultColor);
    }

    moveLeft(){
        if(!this.collision(-1, 0, this.activePiece)){
            this.unDraw();
            this.x--;
            this.draw();
        }
       
    }

    moveRight(){
        if(!this.collision(1, 0, this.activePiece)){
            this.unDraw();
            this.x++;
            this.draw();
        }
        
    }

    rotate(){
        let nextP = this.piece[(this.pieceNumber + 1)%this.piece.length];
        let kick = 0;

        if(!this.collision(0, 0, nextP)){
            if(this.x > COL/2){
                kick = -1;
            } else {
                kick = 1;
            }
        }
        if(!this.collision(kick, 0, nextP)){
            this.unDraw();
            this.x += kick;
            this.pieceNumber = (this.pieceNumber + 1)%this.piece.length;
            this.activePiece = this.piece[this.pieceNumber];
            this.draw();
        }
        
    }

    moveDown(){
        if(!this.collision(0, 1, this.activePiece)){
            this.unDraw();
            this.y++;
            this.draw();
            return
        }
        this.lock();
        piece = randomPiece();
    }

    collision(x,y,nextPiece){
        for(let r = 0; r < nextPiece.length; r++){
            for(let c = 0; c < nextPiece.length; c++){
                if(!nextPiece[r][c]){
                    continue;
                }

                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if(newX < 0 || newX >= COL || newY >= ROW){
                    return true;
                }

                if(newY < 0){
                    continue;
                }

                if(board[newY][newX] != defaultColor){
                    return true;
                }
            }
        }
        return false;
    }

    lock(){
        canMove = false;
        for (let r = 0; r< this.activePiece.length; r++) {
            for(let c = 0; c < this.activePiece.length; c++) {
                if (!this.activePiece[r][c]) {
                    continue;
                }
                if(this.y + r < 0){
                    gameOver();
                    break;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
        for(let r = 0; r < ROW; r++){
            let full = true;
            for(let c = 0;  c < COL; c++){
                full = full && (board[r][c] !== defaultColor);
            }
            if(full){
                updateRowAndScore(r);
            }
        }
        drawBoard();
        canMove = true;
    }
}

function randomPiece(){
    let randomP = Math.floor(Math.random() * allPieces.length);
    return new Piece(allPieces[randomP][0],allPieces[randomP][1]);
}

let piece = randomPiece();

drop();

function drop(){
    const now = Date.now();
    const delta = now - dropStart;

    if(delta > speed){
        piece.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
    
}

document.addEventListener('keydown', CONTROL)

function CONTROL(event){
  if(!canMove){
      return false;
  }

  const moveFunctions = {
    ArrowLeft(){
        piece.moveLeft();
        dropStart = Date.now();
    },
    ArrowRight(){
        piece.moveRight();
        dropStart = Date.now();
    },
    ArrowUp(){
        piece.rotate();
        dropStart = Date.now();
    },
    ArrowDown(){
        piece.moveDown();
        dropStart = Date.now();
    },
  };

  const movePiece = moveFunctions[event.code];
  movePiece();
}

function updateRowAndScore(row){
    canMove = false;

    for(let y = row; y > 1; y--){
        for(let c = 0; c < COL; c++){
            removeRow(y,c);
        }
    }
    for( let c = 0; c < COL; c++){
        board[0][c] = defaultColor;
    }

    score += 10;

    if(speed > 100){
        speed -= 20;
    }

    canMove = true;
}

function removeRow(rRemove, cRemove){
    board[rRemove][cRemove] = board[rRemove - 1][cRemove];
}

function gameOver() {
    document.getElementById('gover').innerHTML = "Game Over";
    setTimeout(function () {
      document.getElementById('gover').innerHTML = "";
    }, 500);
    if(gameOver){
        resetGame();
    }
}

function resetGame(){
    speed = 500;
    dropStart = Date.now();
    score = 0;

    board = [];
    for(let r = 0; r < ROW; r++){
        board[r] = []
        for(let c = 0; c < COL; c++){
            board[r][c] = defaultColor;
        }
    }
    
    piece = randomPiece();
    drawBoard();
}

function play() {
    let audio = new Audio('tetris-gameboy-01.mp3');
    audio.play();
  }
