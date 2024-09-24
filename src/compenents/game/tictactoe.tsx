// src/components/game/tictactoe.tsx
import { useState } from 'react';
import { Button, Box, VStack, Text } from '@chakra-ui/react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <Button
      w="60px"
      h="60px"
      fontSize="2xl"
      onClick={onSquareClick}
      borderWidth="1px"
      borderColor="gray.200"
      m="4px"
    >
      {value}
    </Button>
  );
};

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
  status: string;
}

// Board avec le cadre rouge autour du jeu
const Board = ({ xIsNext, squares, onPlay, status }: BoardProps) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  return (
<VStack spacing={4}>
  <Box borderWidth="2px" borderStyle="solid" borderColor="teal.500" borderRadius={25} p={4} mb={4}>
    <Text fontSize="lg">{status}</Text>
  </Box>
  <Box borderWidth="2px" borderStyle="solid" borderColor="teal.500" borderRadius={25} p={4}>
    {[0, 3, 6].map((row) => (
      <Box key={row} display="flex">
        <Square value={squares[row]} onSquareClick={() => handleClick(row)} />
        <Square value={squares[row + 1]} onSquareClick={() => handleClick(row + 1)} />
        <Square value={squares[row + 2]} onSquareClick={() => handleClick(row + 2)} />
      </Box>
    ))}
  </Box>
</VStack>
  );
};

const TicTacToe = () => {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const [xStarts, setXStarts] = useState(Math.random() < 0.5);
  const xIsNext = (currentMove % 2 === 0) ? xStarts : !xStarts;

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXStarts(Math.random() < 0.5);
  };

  const winner = calculateWinner(currentSquares);
  const isBoardFull = currentSquares.every(square => square !== null);
  let status = winner
    ? `${winner} a gagné !`
    : isBoardFull
    ? "Match nul !"
    : `Prochain tour : ${xIsNext ? 'X' : 'O'}`;

  return (
    <VStack spacing={8} mt={8}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} status={status} />
      <Button onClick={handleReset} colorScheme="teal" size="lg">
        Rejouer
      </Button>
    </VStack>
  );
};

export default TicTacToe;

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}