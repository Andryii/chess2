import { useMemo, useState } from "react";
import AppStyle from "./App.module.css";
import Board from "./Board/Board";
import { ActiveFigureContext, HistoryContext } from "./context";
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
  const STANDART = [
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "b_queen", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "b_pawn", "none", "none", "none", "none"],
    ["none", "none", "none", "w_king", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
  ];

  //Текущая ситуация на поле
  const [posFigure, setPosFigure] = useState(STANDART);

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

  useMemo(() => {
    let startPositions = STANDART;

    let position;

    history.forEach((move) => {
      position = {
        start: {
          Y: Math.floor(move.start / 10),
          X: move.start % 10,
        },
        end: {
          Y: Math.floor(move.end / 10),
          X: move.end % 10,
        },
      };

      startPositions[position.end.Y][position.end.X] =
        startPositions[position.start.Y][position.start.X];
      startPositions[position.start.Y][position.start.X] = "none";
    });

    setPosFigure(startPositions);
  }, [history]);

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
