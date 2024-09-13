import { useState } from 'react';
import './Board.css';

const MAP_SIZE = 20;

export default function Board() {
    const [board, setBoard] = useState(
        Array(MAP_SIZE).fill(Array(MAP_SIZE).fill(0))
    );


    return (
        <div className='main'>
        <h1>Board</h1>
        <div className="board">
            {board.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <div key={j} className="cell"></div>
                    ))}
                </div>
            ))}
        </div>
        </div>
    )
}