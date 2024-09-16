import './App.css';
import Lobby from './Lobby/Lobby';
import Board from './board/Board';
import { useSelector } from 'react-redux';

function App() {
  const state_game = useSelector((state) => state.game);
  return (
      <div className="App">
        {
          state_game.component === true ? <Board diff={state_game.difficulte}/> : <Lobby />
        }
      </div>
  );
}

export default App;
