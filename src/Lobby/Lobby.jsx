
import { useState } from 'react';
import './Lobby.css';
import { useDispatch } from 'react-redux';
import { startGame, setDifficulte } from '../features/game/gameSlice';



export default function Lobby(){
    const dispatch = useDispatch();
    
    const gameStart = () => {
        dispatch(startGame());
        dispatch(setDifficulte(difficulte));
    }
    const [difficulte, setD] = useState(500);
    return (
        <div className='main'>
            <div className='container_lobby' >
            <h1>SNAKE</h1>
            <div className='container_difficulte'>
                    <span>Difficulté</span>
                    <select value={difficulte} onChange={(e) => setD(e.target.value)}>
                        <option value={600}>
                            Facile
                        </option>
                        <option value={400}>
                            Moyen
                        </option>
                        <option value={200}>
                            Difficile
                        </option>
                    </select>
                </div>
                <a className='btn_startgame' onClick={() => {gameStart()}}>Start Game</a>
            </div>
        </div>
    )
}