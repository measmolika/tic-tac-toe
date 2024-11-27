import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null
  });

  useEffect(() => {
    socket.on('gameState', (state) => {
      setGameState(state);
    });

    return () => socket.off('gameState');
  }, []);

  const handleClick = (index) => {
    if (gameState.board[index] || gameState.winner) return;
    socket.emit('makeMove', index);
  };

  const renderCell = (index) => (
    <button
      key={index}
      style={{
        width: "60px",
        height: "60px",
        fontSize: "24px",
        textAlign: "center",
      }}
      onClick={() => handleClick(index)}
    >
      {gameState.board[index]}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gridTemplateRows: "repeat(3, 60px)",
        }}
      >
        {gameState.board.map((_, index) => renderCell(index))}
      </div>
      <button
        onClick={() => socket.emit('restartGame')}
        style={{ marginTop: "20px", padding: "10px 20px", width: "auto", fontSize: "16px" }}
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;