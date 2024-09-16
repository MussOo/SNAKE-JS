import { useEffect, useState } from 'react';
import './Board.css';
import { randomInt } from '../lib/utils';
import Swal from 'sweetalert2';

const MAP_SIZE = 20;
const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

  // Fonction pour gérer les événements de touches du clavier



class Food {
    constructor() {
        this.x = randomInt(0, MAP_SIZE - 1);
        this.y = randomInt(0, MAP_SIZE - 1);
    }

    
    setRandomPosition() {
        this.x = randomInt(0, MAP_SIZE - 1);
        this.y = randomInt(0, MAP_SIZE - 1);
    }
}

class Snake {
    constructor() {
        this.head = { 
            x: randomInt(0, MAP_SIZE - 1),
            y: randomInt(0, MAP_SIZE - 1) 
        };
        this.body = [];
        this.direction = DIRECTIONS.DOWN;
    }

    move () {
        const newHead = { x: this.head.x, y: this.head.y };
        switch (this.direction) {
            case DIRECTIONS.UP:
                newHead.y -= 1;
                break;
            case DIRECTIONS.DOWN:
                newHead.y += 1;
                break;
            case DIRECTIONS.LEFT:
                newHead.x -= 1;
                break;
            case DIRECTIONS.RIGHT:
                newHead.x += 1;
                break;
            default:
                break;
        }
        //if body exist, follow the head
        let newbody = [];
        if(this.body.length > 0){
            this.body.reverse().map((cell, i) => {
                if (this.body.length > 0 && this.body[i + 1] !== undefined){
                    newbody[i] = {...this.body[i + 1]};
                }else{
                    newbody[i] = {...this.head};
                }
            });

        }

        this.body = newbody.reverse();
        this.head = newHead;
    }

    eat(){
        let tail_position = this.body.length > 0 ? {x : this.body[this.body.length - 1].x, y: this.body[this.body.length - 1].y} : {x: this.head.x, y: this.head.y};

        switch (this.direction) { 
            case DIRECTIONS.UP:
                tail_position.y += 1;
                break;
            case DIRECTIONS.DOWN:
                tail_position.y -= 1;
                break;
            case DIRECTIONS.LEFT:
                tail_position.x += 1;
                break;
            case DIRECTIONS.RIGHT:
                tail_position.x -= 1;
                break;
            default:
                break;
        } 

        this.body.push(tail_position);
    }
}


let food = new Food();
let snake = new Snake();

export default function Board({diff = 500}) {
    const [VELOCITY, setVelocity] = useState(diff);
    const [board, setBoard] = useState(
        Array(MAP_SIZE).fill(0 ).map(() => Array(MAP_SIZE).fill(0))
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
              case 'ArrowUp':
                if (snake.direction !== DIRECTIONS.DOWN)  snake.direction = DIRECTIONS.UP;
                break;
              case 'ArrowDown':
                if (snake.direction !== DIRECTIONS.UP)  snake.direction = DIRECTIONS.DOWN;
                break;
              case 'ArrowLeft':
                if (snake.direction !== DIRECTIONS.RIGHT)  snake.direction = DIRECTIONS.LEFT;
                break;
              case 'ArrowRight':
                if (snake.direction !== DIRECTIONS.LEFT)  snake.direction = DIRECTIONS.RIGHT;
                break;
              default:
                break;
            }
          };
          
        window.addEventListener('keydown', handleKeyDown);
        
        const interval = setInterval(() => {
            snake.move();


            if (snake.head.x === food.x && snake.head.y === food.y) {
                snake.eat();
                food.setRandomPosition();
                setVelocity(VELOCITY - 30);
            }
            
            const newBoard = Array(MAP_SIZE).fill(0).map(() => Array(MAP_SIZE).fill(0));
            if( newBoard[snake.head.x] === undefined || newBoard[snake.head.x][snake.head.y] === undefined){
                Swal.fire({
                    title: 'Game Over',
                    text: 'You hit the wall',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
                .then(() => { 
                    window.location.reload();
                });
                
                clearInterval(interval);
            }else{
                newBoard[food.x][food.y] = 3;
                newBoard[snake.head.x][snake.head.y] = 1;
                snake.body.map((cell) => {
                    newBoard[cell.x][cell.y] = 2;
                });
                setBoard(newBoard);
            }

        }, VELOCITY);



        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [snake]);


    return (
        <div className='main'>
        <h1>Board</h1>
        <div className="board"> 
            {board.map((row, i) => (
            <div key={i} className="row">
                {row.map((cell, j) => (
                    <div key={j} className={`cell` + 
                        (cell === 1 ? ' snake' : '') +
                        (cell === 2 ? ' snake-body' : '') +
                        (cell === 3 ? ' food' : '')
                    }></div>
                ))}
            </div>
            ))}
        </div>
        </div>
    )
}