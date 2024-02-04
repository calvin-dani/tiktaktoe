import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { fireStoreDb } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';


const TikTakToeJoin = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState('');
    const [error, setError] = useState(null);
    const docId = useLocalSearchParams();
    const [fetch, setFetch] = useState(true);
    const [count, setCount] = useState(1);

    const compareTwoArrays = (arr1, arr2) => {
        
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const fetchData = async () => {
            const docRef = doc(fireStoreDb, "sample", docId.id);
            await updateDoc(docRef, {
                name2: user.email, // the field you want to update
                // other fields to update...
            }).then(() => {
                console.log("Document written with ID: ");
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        };
        const docRef = doc(fireStoreDb, "sample", docId.id);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            console.log("listener 0",fetch,docId.id);
            
            if (docSnap.exists() && count % 2 == 1) {
                console.log(docSnap.data().game," game")
                setBoard((prev)=>docSnap.data().game);
                setCount(docSnap.data().count);
                // setIsXNext(!isXNext);
            } else {
                console.log("No such document!");
            }
            // if (docSnap.exists() && !compareTwoArrays(docSnap.data(),board)) {
            //     setFetch(!fetch);
            // }
        }, (error) => {
            console.error("Error getting document: ", error);
        });

        fetchData();
    }, []);

    const writeData = async (nextBoard) => {
        // print(user, "user");
        console.log("write 1",fetch,docId.id);
        const docRef = doc(fireStoreDb, "sample", docId.id);
        await updateDoc(docRef, {
            game: nextBoard, // the field you want to update
            count: count + 1
            // other fields to update...
        }).then(() => {
            console.log("Document written with ID: ");
            // setIsXNext(!isXNext);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

    const handlePress = (index) => {
        print("PRESS 1",fetch)
        if (board[index] !== '' || winner || count % 2 == 0) {
            // If the square is already filled or the game is over, ignore the press
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'O' : 'X';
        setBoard((prev) => newBoard);
        writeData(newBoard)
        // setFetch((prev) => !prev);
        setCount((prev) => prev + 1);
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
        <View style={styles.mainContainer}>
            <View style={styles.statusBar}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...styles.xo, color: "#37c5c1" }}>X</Text>
                    <Text style={{ ...styles.xo, color: "#f5b63c" }}>O</Text>
                </View>
                <Text style={styles.status}>{winner ? `Winner: ${winner}` : `${isXNext ? 'O' : 'X'} TURN`}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...styles.xo, color: "#37c5c1" }}>X</Text>
                    <Text style={{ ...styles.xo, color: "#f5b63c" }}>O</Text>
                </View>
            </View>
            <Board board={board} onPress={handlePress} />
            {/* Other UI elements */}
        </View>
    );
};

export default TikTakToeJoin;


export const Board = ({ board, onPress }) => {
    // if (board === undefined) {
    //     board = []
    // }
    return (
        <View style={styles.container} >
            {board.map((value, index) => (
                <Square key={index} value={value} onPress={() => onPress(index)} />
            ))}
        </View>
    );
};

const Square = ({ value, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.boxes}>
            <Text style={{ ...styles.value, color: value == "X" ? "#37c5c1" : "#f5b63c" }}> {value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center"
    },
    statusBar: {
        backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        alignItems: "center",
        backgroundColor: "#192a32",
        marginBottom: 10,
        borderRadius: 10,
        padding: 20
    },
    xo: {
        fontSize: 35,
        padding: 1,
        fontWeight: "900"
    },
    status: {
        fontSize: 25,
        fontWeight: "900",
        fontFamily: "sans-serif",
        color: "#abc1cb",
        backgroundColor: "#1f3640",
        padding: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 1.05,
        elevation: 8,
        borderRadius: 10
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: "95%",
        height: "auto",
        padding: 10,
        justifyContent: "center",
        backgroundColor: '#192a32',
        borderRadius: 10,
        alignContent: "center"
    },
    boxes: {
        width: "25%",
        padding: 20,
        margin: 10,
        backgroundColor: "#1f3640",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 1.05,
        elevation: 8
    },
    value: {
        fontSize: 30,
        fontWeight: 900,
        paddingRight: 10
    }
})





