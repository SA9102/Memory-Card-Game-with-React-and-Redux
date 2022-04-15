import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "./Card";

import {
  SET_GAME_SIZE,
  SET_CARDS,
  INCORRECT_GUESS,
  RESET_GUESSES,
} from "../actions";

function Game({ gameSize, cards, incorrectGuesses, dispatch }) {
  const sizes = {
    small: [4, 2],
    medium: [6, 3],
    large: [8, 4],
    huge: [10, 5],
  };

  const getRandomInt = (max) => {
    const randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
  };

  const handleShow = (id) => {
    let cardsTemp = [...cards];
    cardsTemp[id].showing = true;
    dispatch({ type: SET_CARDS, payload: cardsTemp });
    const cardsShowing = cards.reduce((acc, card) => {
      if (card.showing && !card.matched) {
        return [...acc, card];
      } else {
        return [...acc];
      }
    }, []);
    if (cardsShowing.length === 2) {
      handleCheck(cardsShowing);
    }
  };

  const handleCheck = (cardsShowing) => {
    const id1 = cardsShowing[0].id;
    const id2 = cardsShowing[1].id;
    let cardsTemp = [...cards];
    if (cardsShowing[0].number === cardsShowing[1].number) {
      cardsTemp[id1].matched = true;
      cardsTemp[id2].matched = true;
      dispatch({ type: SET_CARDS, payload: cardsTemp });
    } else {
      dispatch({ type: INCORRECT_GUESS });
      setTimeout(() => {
        cardsTemp[id1].showing = false;
        cardsTemp[id2].showing = false;
        dispatch({ type: SET_CARDS, payload: cardsTemp });
      }, 600);
    }
  };

  const chooseValues = (size) => {
    let values = [];
    for (let i = 0; i < size; i++) {
      let value = getRandomInt(100);
      while (values.includes(value)) {
        value = getRandomInt(100);
      }
      values.push(value);
    }
    return [...values, ...values];
  };

  const renderCard = (sizeArray) => {
    let cardsArray = [];
    let id = 0;
    const size = sizeArray[0] * sizeArray[1];
    let values = chooseValues((sizeArray[0] * sizeArray[1]) / 2);

    dispatch({ type: RESET_GUESSES });

    for (let value = 0; value < size; value++) {
      const valueIndex = getRandomInt(values.length);
      cardsArray.push({
        id: id,
        number: values[valueIndex],
        showing: false,
        matched: false,
      });
      values.splice(valueIndex, 1);
      id++;
    }
    dispatch({ type: SET_CARDS, payload: cardsArray });
  };

  return (
    <React.Fragment>
      <h1>Memory Card Game</h1>
      <p>Select game size:</p>
      <div className="select-game-size">
        <div className="radio-input">
          <input
            type="radio"
            name="game-size"
            id="small"
            value="small"
            onChange={(e) =>
              dispatch({ type: SET_GAME_SIZE, payload: e.target.value })
            }
          />
          <label htmlFor="small">Small - 4x2</label>
        </div>
        <div className="radio-input">
          <input
            type="radio"
            name="game-size"
            id="medium"
            value="medium"
            onChange={(e) =>
              dispatch({ type: SET_GAME_SIZE, payload: e.target.value })
            }
          />
          <label htmlFor="medium">Medium - 6x3</label>
        </div>
        <div className="radio-input">
          <input
            type="radio"
            name="game-size"
            id="large"
            value="large"
            onChange={(e) =>
              dispatch({ type: SET_GAME_SIZE, payload: e.target.value })
            }
          />
          <label htmlFor="large">Large - 8x4</label>
        </div>
        <div className="radio-input">
          <input
            type="radio"
            name="game-size"
            id="huge"
            value="huge"
            onChange={(e) =>
              dispatch({ type: SET_GAME_SIZE, payload: e.target.value })
            }
          />
          <label htmlFor="huge">Huge - 10x5</label>
        </div>
      </div>
      <button className="new-game" onClick={() => renderCard(sizes[gameSize])}>
        New Game
      </button>
      <br />
      <div className="cards">
        {cards.map((card) => {
          const { id, number, showing } = card;
          console.log(cards);
          return (
            <Card
              key={id}
              id={id}
              number={number}
              showing={showing}
              onShow={() => handleShow(id)}
            />
          );
        })}
      </div>
      <p>{`Incorrect Guesses: ${incorrectGuesses}`}</p>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { gameSize, cards, incorrectGuesses } = state;
  return { gameSize, cards, incorrectGuesses };
};

export default connect(mapStateToProps)(Game);
