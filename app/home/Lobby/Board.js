
import { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { fireStoreDb } from "../../../firebaseConfig";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import TikTakToeJoin from "../Game/TikTakToeJoin";
import { router } from 'expo-router';

const Board = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const coll = collection(fireStoreDb, "sample");
        const q = query(coll);
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log(documentSnapshot.id, " => ", documentSnapshot.data());
            // });
            const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(dataList, "dataList");    
            setData(dataList);
                setLoading(false);
        }, error => {
            console.error("Error getting documents: ", error);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Error: {error} {fireStoreDb}</Text>;
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tableItem}>
                        {/* Render each item as a row in your table */}
                        {/* <Text>{item.id}</Text> */}
                        
                        <Text style={{ ...styles.items, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>{item.name}</Text>
                        <TouchableOpacity onPress={()=> router.replace({ pathname: 'home/Game/TikTakToeJoin', params: { id: item.id } })}>
                        <Text style={{ ...styles.items, borderBottomRightRadius: 10, borderTopRightRadius: 10, borderLeftColor: "white", borderLeftWidth: 2 } }>Join</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    tableItem: {
        flexDirection:
            "row",
        justifyContent: "center"
    },
    items: {
        padding: 25,
        backgroundColor: "#1f3640",
        color: "white",
        fontSize: 15,
        fontWeight: "400",
        width: "40%"
    }
})
export default Board;



