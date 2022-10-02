import { useMemo, useState } from "react";
import AppStyle from "./App.module.css";
import Board from "./Board/Board";
import {
  ActiveFigureContext,
  HistoryContext,
  PosibleCellContext,
} from "./context";
import getPosibleMove from "./API/getPosibleMove";
function App() {
  /*Стандартное положение всех фигур 
  [
    [
      "b_bishop",
      "b_knight",
      "b_rook",
      "b_queen",
      "b_king",
      "b_rook",
      "b_knight",
      "b_bishop",
    ],
    [
      "b_pawn",
      "b_pawn",
      "b_pawn",
      "b_pawn",
      "b_pawn",
      "b_pawn",
      "b_pawn",
      "b_pawn",
    ],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    [
      "w_pawn",
      "w_pawn",
      "w_pawn",
      "w_pawn",
      "w_pawn",
      "w_pawn",
      "w_pawn",
      "w_pawn",
    ],
    [
      "w_bishop",
      "w_knight",
      "w_rook",
      "w_queen",
      "w_king",
      "w_rook",
      "w_knight",
      "w_bishop",
    ],
  ]
  
  */

  //Текущая ситуация на поле
  const [posFigure, setPosFigure] = useState([
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "b_knight", "none", "none", "none", "none", "none", "none"],
    ["none", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "none", "none"],
    ["none", "w_pawn", "b_pawn", "b_rook", "none", "w_pawn", "none", "none"],
    ["none", "w_pawn", "none", "none", "none", "w_pawn", "none", "none"],
    ["none", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
  ]);

  /*
  {
    position: id,
    name: figure,
  }

    Хранит активную фигуру для хода
  */
  const [activeFigure, setActiveFigure] = useState("none");

  /*
    [
      {
        start: "30",
        end: "21"
      }
    ]

    Хранит полную историю ходов
  */
  const [history, setHistory] = useState([]);

  //Хранит возможные пути движений для конкретной выбраной пешки
  const [posibleCell, setPosibleCell] = useState({
    attak: [],
    move: [],
  });

  //Заполняет или очищает возможные пути для хода
  useMemo(() => {
    if (activeFigure == "none") {
      setPosibleCell({
        attak: [],
        move: [],
      });
    } else {
      setPosibleCell(getPosibleMove(activeFigure, posFigure, history));
    }
  }, [activeFigure]);

  return (
    <div className={AppStyle.App}>
      <HistoryContext.Provider value={{ history, setHistory }}>
        <ActiveFigureContext.Provider value={{ activeFigure, setActiveFigure }}>
          <Board
            posibleCell={posibleCell}
            size={posFigure.length}
            cell={100}
            posFigure={posFigure}
          />
        </ActiveFigureContext.Provider>
      </HistoryContext.Provider>
    </div>
  );
}
export default App;
