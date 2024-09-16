// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  component: false,
  difficulte: 500,
};

const gameSlice = createSlice(
    {
        name: 'game',
        initialState,
        reducers: {
        startGame: (state) => {
            state.component = true;
        },
        endGame: (state) => {
            state.component = false;
        },
        setDifficulte: (state, action) => {
            state.difficulte = action.payload;
        }
        },

    }
    );
    
    export const { startGame, endGame, setDifficulte } = gameSlice.actions;

    export default gameSlice.reducer;