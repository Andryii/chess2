import React, { useContext, useEffect, useMemo, useState } from "react";
import CellStyle from "./Cell.module.css";
import Figure from "../chess_figure/figure";
import { ActiveFigureContext, HistoryContext } from "../context";
const Cell = ({ cellsize, parity, figure, id, stylemove }) => {
  const { activeFigure, setActiveFigure } = useContext(ActiveFigureContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [imgStyle, setImgStyle] = useState({
    height: cellsize,
    width: cellsize,
    display: figure,
  });

  //Масив который хранит текущее состояние клетки
  const [cellClassName, setCellClassName] = useState([
    CellStyle[parity],
    CellStyle[stylemove],
  ]);

  //Обновляет стили клетки
  useMemo(() => {
    if (stylemove == "" && !cellClassName.includes(CellStyle.active)) {
      // Удаляет стиль если это не возможный путь хода
      setCellClassName([CellStyle[parity], CellStyle[stylemove]]);
    } else if (
      activeFigure.position !== id &&
      cellClassName.includes(CellStyle.active) &&
      stylemove == ""
    ) {
      //Удаляет стиль активации
      setCellClassName([CellStyle[parity], CellStyle[stylemove]]);
    } else {
      //Накладывает
      setCellClassName([...cellClassName, CellStyle[stylemove]]);
    }

    setImgStyle({
      height: cellsize,
      width: cellsize,
      display: figure == "none" ? "none" : "block",
    });
  }, [activeFigure]);

  return (
    <div
      style={{ height: cellsize, width: cellsize }}
      className={cellClassName.join(" ")}
      onClick={() => {
        if (stylemove == "posiblemove") {
          setHistory([...history, { start: activeFigure.position, end: id }]);
          setActiveFigure("none");
        }
      }}
    >
      <img
        onClick={() => {
          if (stylemove == "posibleattak") {
            setHistory([...history, { start: activeFigure.position, end: id }]);
            setActiveFigure("none");
          } else if (
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
        style={imgStyle}
        src={Figure[figure]}
        alt={figure}
      />
    </div>
  );
};

export default Cell;
