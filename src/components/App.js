import React from "react";
import Game from "./Game";
import reducer from "../reducer";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialStore = {
  gameSize: "",
  cards: [],
  incorrectGuesses: 0,
};

const store = createStore(reducer, initialStore);

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
