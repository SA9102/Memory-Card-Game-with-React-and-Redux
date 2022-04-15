import React, { useState } from "react";

export default function Card({ id, number, showing, onShow }) {
  return (
    <React.Fragment>
      <button className="card" onClick={() => onShow(id)}>
        {showing ? number : null}
      </button>
    </React.Fragment>
  );
}
