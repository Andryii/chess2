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

  let increment = 1;

  while (position.X - increment >= 0) {
    if (posFigure[position.Y][position.X - increment] == "none") {
      res.move.push("" + position.Y + position.X - increment);
    } else if (
      posFigure[position.Y][position.X - increment][0] != activeFigure.name[0]
    ) {
      res.attak.push("" + position.Y + position.X - increment);
      break;
    } else break;

    increment++;
  }

  increment = 1;

  while (position.X + increment < 8) {
    console.log(posFigure[position.Y][position.X + increment]);
    if (posFigure[position.Y][position.X + increment] == "none") {
      res.move.push("" + position.Y + (position.X + increment));
    } else if (
      posFigure[position.Y][position.X + increment][0] != activeFigure.name[0]
    ) {
      res.attak.push("" + position.Y + (position.X + increment));
      break;
    } else break;

    increment++;
  }

  increment = 1;

  while (position.Y - increment >= 0) {
    if (posFigure[position.Y - increment][position.X] == "none") {
      res.move.push("" + (position.Y - increment) + position.X);
    } else if (
      posFigure[position.Y - increment][position.X][0] != activeFigure.name[0]
    ) {
      res.attak.push("" + (position.Y - increment) + position.X);
      break;
    } else break;

    increment++;
  }

  increment = 1;

  while (position.Y + increment < 8) {
    if (posFigure[position.Y + increment][position.X] == "none") {
      res.move.push("" + (position.Y + increment) + position.X);
    } else if (
      posFigure[position.Y + increment][position.X][0] != activeFigure.name[0]
    ) {
      res.attak.push("" + (position.Y + increment) + position.X);
      break;
    } else break;

    increment++;
  }

  return res;
};

let knight = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  return res;
};
let rook = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  return res;
};
let queen = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  return res;
};
let king = (activeFigure, posFigure, history) => {
  let res = {
    attak: [],
    move: [],
  };
  return res;
};

const figures = { pawn, bishop, knight, rook, queen, king };

const getPosibleMove = (activeFigure, posFigure, history) => {
  return figures[activeFigure.name.slice(2)](activeFigure, posFigure, history);
};

export default getPosibleMove;
