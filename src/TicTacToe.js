import React, { useState, useEffect } from "react";
import "./TicTacToe.scss";

function TicTacToe() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);

  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const [poinstO, setPointsO] = useState(0);
  const [pointsX, setPointsX] = useState(0);
  const [draws, setDraws] = useState(0);
  const handleCellClick = (index) => {
    if(winner) return null;

    if (board[index] !== "") return null;

    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")){
        setWinner("O");
        setPointsO(poinstO + 1);

      };
      if (cells.every((cell) => cell === "X")){
        setWinner("X")
        setPointsX(pointsX + 1);
      }
    });


    checkDraw();
  };

  const checkDraw = () => {
    if(board.every(item => item !== "")){
      setWinner("E");
      setDraws(draws + 1);
    };
  }
  useEffect(checkWinner, [board]);

  const resetGame = ()=>{
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
      <main>
        <h1 className="title">Tic Tac Toe</h1>

        <div className="points">
          <h2>Pontos O: <span className="pointsO">{poinstO}</span></h2>
          <h2>Pontos X: <span className="pointsX">{pointsX}</span></h2>
          <h2>Empates: <span className="draws">{draws}</span></h2>

        </div>

        <div className={`board ${winner ? "game-over": '' }`}>
          {board.map((item, index) => (
            <div
              className={`cell ${item}`}
              key={index}
              onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
          ))}
        </div>

        {winner &&
          <footer>
            {winner === "E" ? 
              <h2 className="winner-message">
                <span className={winner}>Empate</span>
              </h2>
            :
              <h2 className="winner-message">
                <span className={winner}>{winner}</span> venceu!
              </h2>
            }
            <button onClick={resetGame}>Recomeçar jogo</button>
          </footer>
        }
      </main>
  );
}

export default TicTacToe;
