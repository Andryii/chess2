import React, { useContext, useState } from "react";
import CellStyle from "./Cell.module.css";
import Figure from "../chess_figure/figure";
import { ActiveFigureContext } from "../context";
const Cell = ({ cellsize, parity, figure, id }) => {
  const { activeFigure, setActiveFigure } = useContext(ActiveFigureContext);

  const [cellClassName, setCellClassName] = useState([CellStyle[parity]]);

  return (
    <div
      style={{ height: cellsize, width: cellsize }}
      className={cellClassName.join(" ")}
    >
      <img
        onClick={() => {
          if (
            cellClassName.some((el) => {
              return el == CellStyle.active;
            })
          ) {
            setCellClassName(
              cellClassName.filter((el) => {
                return el !== CellStyle.active;
              })
            );

            setActiveFigure("none");
          } else {
            setCellClassName([...cellClassName, CellStyle.active]);
            setActiveFigure({
              position: id,
              name: figure,
            });
          }
        }}
        style={{ height: cellsize, width: cellsize, display: figure }}
        src={Figure[figure]}
        alt={figure}
      />
    </div>
  );
};

export default Cell;
