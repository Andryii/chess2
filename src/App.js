import { useState } from "react";
import AppStyle from "./App.module.css";
import Board from "./Board/Board";

function App() {
  const [posFigure, setPosFigure] = useState([
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
  ]);

  return (
    <div className={AppStyle.App}>
      <Board size={posFigure.length} cell={100} posFigure = {posFigure} />
    </div>
  );
}
export default App;
