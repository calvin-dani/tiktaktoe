import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";

const TikTakToe = () => {


    const [board, setBoard] = useState(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState('');

    const handlePress = (index) => {
        if (board[index] !== '' || winner) {
            // If the square is already filled or the game is over, ignore the press
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const winner = checkWinner(newBoard);
        if (winner) {
            setWinner(winner);
        }
    };


    const checkWinner = (board) => {
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
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return '';
    };


    return (
        <View >
            <Text>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</Text>
            <Board board={board} onPress={handlePress} />
            {/* Other UI elements */}
        </View>
    );
};

export default TikTakToe;


export const Board = ({ board, onPress }) => {
    // if (board === undefined) {
    //     board = []
    // }
    return (
        <View >
            {board.map((value, index) => (
                <Square key={index} value={value} onPress={() => onPress(index)} />
            ))}
        </View>
    );
};

const Square = ({ value, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text >T {value}</Text>
        </TouchableOpacity>
    );
};
