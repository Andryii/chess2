let pawn = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };

  //move logic
  if (position.Y !== (activeFigure.name[0] == "b" ? 1 : 7)) {
    posFigure[position.Y + (activeFigure.name[0] == "b" ? 1 : -1)][
      position.X
    ] == "none"
      ? res.move.push(
          "" +
            (position.Y + (activeFigure.name[0] == "b" ? 1 : -1)) +
            position.X
        )
      : res.move.push("");
  } else {
    if (
      posFigure[position.Y + (activeFigure.name[0] == "b" ? 1 : -1)][
        position.X
      ] == "none"
    ) {
      res.move.push(
        "" + (position.Y + (activeFigure.name[0] == "b" ? 1 : -1)) + position.X
      );
      posFigure[position.Y + (activeFigure.name[0] == "b" ? 2 : -2)][
        position.X
      ] == "none"
        ? res.move.push(
            "" +
              (position.Y + (activeFigure.name[0] == "b" ? 2 : -2)) +
              position.X
          )
        : res.move.push("");
    }
  }

  //attak logic
  let positionAttak = [
    {
      Y: position.Y + (activeFigure.name[0] == "b" ? 1 : -1),
      X: position.X + (activeFigure.name[0] == "b" ? 1 : -1),
    },
    {
      Y: position.Y + (activeFigure.name[0] == "b" ? 1 : -1),
      X: position.X - (activeFigure.name[0] == "b" ? 1 : -1),
    },
  ];

  positionAttak.map((att) => {
    posFigure[att.Y][att.X] !== "none" &&
    att.Y >= 0 &&
    att.Y < 8 &&
    att.X >= 0 &&
    att.X < 8 &&
    posFigure[att.Y][att.X][0] != activeFigure.name[0]
      ? res.attak.push("" + att.Y + att.X)
      : res.attak.push("");
  });

  return res;
};

let bishop = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };

  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };
  let increment;
  let XX;
  let YY;
  [
    { X: 0, Y: -1 },
    { X: 0, Y: 1 },
    { X: -1, Y: 0 },
    { X: 1, Y: 0 },
  ].map((move) => {
    increment = 1;
    while (
      position.X + increment * move.X >= 0 &&
      position.X + increment * move.X < 8 &&
      position.Y + increment * move.Y >= 0 &&
      position.Y + increment * move.Y < 8
    ) {
      XX = position.X + increment * move.X;
      YY = position.Y + increment * move.Y;

      if (posFigure[YY][XX] == "none") {
        res.move.push("" + YY + XX);
      } else if (posFigure[YY][XX][0] != activeFigure.name[0]) {
        res.attak.push("" + YY + XX);
        break;
      } else break;

      increment++;
    }
  });

  return res;
};

let knight = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };

  [
    { X: position.X + 2, Y: position.Y - 1 },
    { X: position.X + 2, Y: position.Y + 1 },
    { X: position.X - 2, Y: position.Y - 1 },
    { X: position.X - 2, Y: position.Y + 1 },
    { X: position.X + 1, Y: position.Y + 2 },
    { X: position.X - 1, Y: position.Y + 2 },
    { X: position.X + 1, Y: position.Y - 2 },
    { X: position.X - 1, Y: position.Y - 2 },
  ].map((move) => {
    if (move.X >= 0 && move.X < 8 && move.Y >= 0 && move.Y < 8) {
      posFigure[move.Y][move.X] == "none"
        ? res.move.push("" + move.Y + move.X)
        : posFigure[move.Y][move.X][0] != activeFigure.name[0]
        ? res.attak.push("" + move.Y + move.X)
        : res.move.push("");
    }
  });

  return res;
};
let rook = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };
  let increment;
  let XX;
  let YY;
  [
    { X: -1, Y: -1 },
    { X: 1, Y: 1 },
    { X: -1, Y: 1 },
    { X: 1, Y: -1 },
  ].map((move) => {
    increment = 1;
    while (
      position.X + increment * move.X >= 0 &&
      position.X + increment * move.X < 8 &&
      position.Y + increment * move.Y >= 0 &&
      position.Y + increment * move.Y < 8
    ) {
      XX = position.X + increment * move.X;
      YY = position.Y + increment * move.Y;

      if (posFigure[YY][XX] == "none") {
        res.move.push("" + YY + XX);
      } else if (posFigure[YY][XX][0] != activeFigure.name[0]) {
        res.attak.push("" + YY + XX);
        break;
      } else break;

      increment++;
    }
  });

  return res;
};

let king = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };

  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };

  let attakZone = [];

  posFigure.map((line, Y) => {
    line.map((cell, X) => {
      if (
        cell[0] != activeFigure.name[0] &&
        cell != "none" &&
        cell.slice(2) != "pawn"
      ) {
        attakZone.push(
          ...figures[cell.slice(2)](activeFigure, posFigure, history).move
        );
      }

      if (cell[0] != activeFigure.name[0] && cell.slice(2) == "pawn") {
        attakZone.push(
          ...[
            "" + (Y + (cell[0] == "b" ? 1 : -1)) + (X + 1),
            "" + (Y + (cell[0] == "b" ? 1 : -1)) + (X - 1),
          ]
        );
      }
    });
  });

  attakZone = [...new Set(attakZone)];

  [
    { X: position.X - 1, Y: position.X - 1 },
    { X: position.X + 1, Y: position.X + 1 },
    { X: position.X - 1, Y: position.X + 1 },
    { X: position.X + 1, Y: position.X - 1 },
    { X: position.X + 0, Y: position.X - 1 },
    { X: position.X + 0, Y: position.X + 1 },
    { X: position.X - 1, Y: position.X + 0 },
    { X: position.X + 1, Y: position.X + 0 },
  ].map((move) => {
    if (!attakZone.includes("" + move.Y + move.X)) {
      posFigure[move.Y][move.X] == "none"
        ? res.move.push("" + move.Y + move.X)
        : posFigure[move.Y][move.X][0] != activeFigure.name[0]
        ? res.attak.push("" + move.Y + move.X)
        : res.move.push("");
    }
  });

  return res;
};

let queen = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };

  let position = {
    Y: Math.floor(activeFigure.position / 10),
    X: activeFigure.position % 10,
  };
  let increment;
  let XX;
  let YY;
  [
    { X: -1, Y: -1 },
    { X: 1, Y: 1 },
    { X: -1, Y: 1 },
    { X: 1, Y: -1 },
    { X: 0, Y: -1 },
    { X: 0, Y: 1 },
    { X: -1, Y: 0 },
    { X: 1, Y: 0 },
  ].map((move) => {
    increment = 1;
    while (
      position.X + increment * move.X >= 0 &&
      position.X + increment * move.X < 8 &&
      position.Y + increment * move.Y >= 0 &&
      position.Y + increment * move.Y < 8
    ) {
      XX = position.X + increment * move.X;
      YY = position.Y + increment * move.Y;

      if (posFigure[YY][XX] == "none") {
        res.move.push("" + YY + XX);
      } else if (posFigure[YY][XX][0] != activeFigure.name[0]) {
        res.attak.push("" + YY + XX);
        break;
      } else break;

      increment++;
    }
  });

  return res;
};

const figures = { pawn, bishop, knight, rook, queen, king };

const getPosibleMove = (activeFigure, posFigure, history) => {
  return figures[activeFigure.name.slice(2)](activeFigure, posFigure, history);
};

export default getPosibleMove;
