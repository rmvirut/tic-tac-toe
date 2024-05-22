import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // iterate over all the turns (won't run if no turns)
  for (const turn of gameTurns) {
    // extract info from the turn object
    const { square, player } = turn;
    const { row, col } = square;
    // update the gameboard
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
      return players[gameBoard[row][0]];
    }

    // check for winning column
    if (
      gameBoard[0][col] &&
      gameBoard[0][col] == gameBoard[1][col] &&
      gameBoard[0][col] == gameBoard[2][col]
    ) {
      return players[gameBoard[0][col]];
    }
  }

  // check diagonal
  if (gameBoard[1][1]) {
    if (
      (gameBoard[1][1] == gameBoard[0][0] &&
        gameBoard[1][1] == gameBoard[2][2]) ||
      (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0])
    ) {
      return players[gameBoard[1][1]];
    }
  }

  return null;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBoard(gameTurns);

  let winner = deriveWinner(gameBoard, players);

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

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol={"X"}
              onChangeName={handlePlayerNameChange}
              isActive={activePlayer === "X"}
            />
            <Player
              initialName={PLAYERS.O}
              symbol={"O"}
              onChangeName={handlePlayerNameChange}
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
