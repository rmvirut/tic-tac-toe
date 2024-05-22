const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSquareSelect(rowIndex, colIndex) {
  //   setGameBoard((previousGameBoard) => {
  //     const updatedBoard = [
  //       ...previousGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // }

  // make a copy of the initial gameBoard
  let gameBoard = initialGameBoard;

  // iterate over all the turns (won't run if no turns)
  for (const turn of turns) {
    // extract info from the turn object
    const { square, player } = turn;
    const { row, col } = square;
    // update the gameboard
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
