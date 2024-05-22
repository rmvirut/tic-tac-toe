import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function determineWinner(gameBoard, gameTurns) {
  let results = false;
  for (
    let row = 0, col = 0;
    row < gameBoard.length, col < gameBoard.length;
    row++, col++
  ) {
    // check if winning row
    if (
      gameBoard[row][0] &&
      gameBoard[row][0] == gameBoard[row][1] &&
      gameBoard[row][0] == gameBoard[row][2]
    ) {
      return true;
    }

    // check for winning column
    if (
      gameBoard[0][col] &&
      gameBoard[0][col] == gameBoard[1][col] &&
      gameBoard[0][col] == gameBoard[2][col]
    ) {
      return true;
    }
  }

  // check diagonal
  if (gameBoard[1][1]) {
    return (
      (gameBoard[1][1] == gameBoard[0][0] &&
        gameBoard[1][1] == gameBoard[2][2]) ||
      (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0])
    );
  }

  return false;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  // iterate over all the turns (won't run if no turns)
  for (const turn of gameTurns) {
    // extract info from the turn object
    const { square, player } = turn;
    const { row, col } = square;
    // update the gameboard
    gameBoard[row][col] = player;
  }

  let winner;

  if (determineWinner(gameBoard)) {
    winner = activePlayer == "X" ? "O" : "X";
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((previousTurns) => {
      let currentPlayer = deriveActivePlayer(previousTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...previousTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol={"X"}
              isActive={activePlayer === "X"}
            />
            <Player
              initialName={"Player 2"}
              symbol={"O"}
              isActive={activePlayer === "0"}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
