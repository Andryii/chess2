import React from "react";
import Cell from "../Сell/Cell";
import BoardStyle from "./Board.module.css";
const Board = ({ size, cell, posFigure }) => {
  return (
    <div
      style={{ height: size * cell, width: size * cell }}
      className={BoardStyle.Board}
    >
      {posFigure.map((line, i) => {
        return (
          <div key={i}>
            {line.map((mapCell, j) => {
              return (
                <Cell
                  key={j}
                  cellsize={cell}
                  parity={(i % 2) - (j % 2) ? "odd" : "even"}
                  figure={mapCell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
