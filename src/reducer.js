import {
  SET_GAME_SIZE,
  SET_CARDS,
  INCORRECT_GUESS,
  RESET_GUESSES,
} from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_GAME_SIZE:
      return { ...state, gameSize: action.payload };

    case SET_CARDS:
      return { ...state, cards: action.payload };

    case INCORRECT_GUESS:
      return { ...state, incorrectGuesses: state.incorrectGuesses + 1 };

    case RESET_GUESSES:
      return { ...state, incorrectGuesses: 0 };

    default:
      return state;
  }
}
