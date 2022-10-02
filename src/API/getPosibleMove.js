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
  if (
    history.some((el) => {
      return el.start == activeFigure.position;
    })
  ) {
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
    att.X < 8
      ? res.attak.push("" + att.Y + att.X)
      : res.attak.push("");
  });
  //attak logic

  // posFigure[position.Y + 1][position.X + 1] !== "none" &&
  // position.Y + 1 >= 0 &&
  // position.Y + 1 < 8 &&
  // position.X + 1 >= 0 &&
  // position.X + 1 < 8
  //   ? res.attak.push("" + position.Y + 1 + (position.X + 1))
  //   : res.attak.push("");

  // posFigure[position.Y - 1][position.X - 1] !== "none" &&
  // position.Y - 1 >= 0 &&
  // position.Y - 1 < 8 &&
  // position.X - 1 >= 0 &&
  // position.X - 1 < 8
  //   ? res.attak.push("" + position.Y - 1 + (position.X - 1))
  //   : res.attak.push("");
  return res;
};

const figures = { pawn };

const getPosibleMove = (activeFigure, posFigure, history) => {
  return figures[activeFigure.name.slice(2)](activeFigure, posFigure, history);
};

export default getPosibleMove;
