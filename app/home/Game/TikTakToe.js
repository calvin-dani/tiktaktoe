import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { onSnapshot, updateDoc } from "firebase/firestore";
import { router,Link } from "expo-router";


const TikTakToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState('');
    const [error, setError] = useState(null);
    const [docId, setDocId] = useState(null);
    // const [fetch, setFetch] = useState(false);
    const [count, setCount] = useState(0);



    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        print(user, "user");
        const fetchData = async () => {
            const docRef = await addDoc(collection(fireStoreDb, "sample"), {
                name: user.email,
                name2: "newUser2",
                game: ["", "", "", "", "", "", "", "", ""],
                count: 0
            }).then((docRef) => {
                setDocId(docRef);
                const unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists() && docSnap.data().count % 2 == 0) {
                        setBoard(docSnap.data().game);
                        setCount(docSnap.data().count);
                        const winner = checkWinner(docSnap.data().game,docSnap.data().count);
                        if (winner) {
                            setWinner(winner);
                        }
                        //   setIsXNext(!isXNext);
                    }
                    else {
                        console.log("No such document!");
                    }
                    // if (docSnap.exists() && !compareTwoArrays(docSnap.data(),board) ){
                    //     setFetch(!fetch);
                    // }
                }, (error) => {
                    console.error("Error getting document: ", error);
                });

                console.log("Document new written with ID: ", docRef.id);
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

        };



        fetchData();
        // return () => {
        //     unsubscribe();
        // };
    }, []);

    const writeData = async (newBoard) => {
        // print(user, "user");
        const docRef = doc(fireStoreDb, "sample", docId.id);
        await updateDoc(docRef, {
            game: newBoard,
            count: count + 1 // the field you want to update
            // other fields to update...
        }).then(() => {
            console.log("Document written with ID for update ");
            // setIsXNext(!isXNext);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    };



    const handlePress = (index) => {
        if (board[index] !== '' || winner || count % 2 != 0) {
            // If the square is already filled or the game is over, ignore the press
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard((prev) => newBoard);
        setCount((prev) => prev + 1);
        writeData(newBoard);

        // setFetch((prev) => !prev);
        const winner = checkWinner(newBoard,count+1);
        if (winner) {
            setWinner(winner);
        }
    };


    const checkWinner = (board,count) => {
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

        if (count == 9) {
            return "DRAW";
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
                <Text style={styles.status}>{winner ? `Winner: ${winner}` : `${isXNext ? 'X' : 'O'} TURN`}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...styles.xo, color: "#37c5c1" }}>X</Text>
                    <Text style={{ ...styles.xo, color: "#f5b63c" }}>O</Text>
                </View>
            </View>
            <Board board={board} onPress={handlePress} />
            <View style={styles.backButton}>
                <Link style={{color:"white",fontSize:20,fontWeight:900}} replace href ='home/HomeScreen'>Go to Home</Link>
            </View>
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
        width:"100%",
        textAlign: "center",
        paddingVertical:"20%",
        backgroundColor:"#192a32"
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
    backButton:{
        backgroundColor:"#627279",
    width:"100%",
    alignItems:"center",
    textAlign:"center",
    marginVertical:10,
    padding:20,
    borderRadius:10,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity:  1,
    shadowRadius: 1.05,
    elevation: 8
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





