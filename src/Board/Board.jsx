import React from "react";
import Cell from "../Сell/Cell";
import BoardStyle from "./Board.module.css";
const Board = ({ posibleCell, size, cell, posFigure }) => {
  return (
    <div
      style={{ height: size * cell, width: size * cell }}
      className={BoardStyle.Board}
    >
      {posFigure.map((line, i) => {
        return (
          <div key={i} className={BoardStyle.line}>
            {line.map((mapCell, j) => {
              let stylemove = "";

              posibleCell.move.some((el) => {
                return el == "" + i + j;
              })
                ? (stylemove = "posiblemove")
                : posibleCell.attak.some((el) => {
                    return el == "" + i + j;
                  })
                ? (stylemove = "posibleattak")
                : (stylemove = "");

              return (
                <Cell
                  stylemove={stylemove}
                  key={"" + i + j}
                  id={"" + i + j}
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
