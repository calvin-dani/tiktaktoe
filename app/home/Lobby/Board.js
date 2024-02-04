
import { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { fireStoreDb } from "../../../firebaseConfig";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import TikTakToeJoin from "../Game/TikTakToeJoin";
import { router , Link } from 'expo-router';

const Board = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const coll = collection(fireStoreDb, "sample");
        const q = query(coll);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
                        <TouchableOpacity >
                            <Text style={{ ...styles.items, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>{item.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace({ pathname: 'home/Game/TikTakToeJoin', params: { id: item.id } })}>
                            <Text style={{ ...styles.items, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>Join</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.backButton}>
                <Link style={{color:"white",fontSize:20,fontWeight:900}} replace href ='home/HomeScreen'>Go to Home</Link>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "20%",
        backgroundColor: "#192a32"
    },

    tableItem: {
        flexDirection:
            "row",
        justifyContent: "center",
        padding: "3%"
    },
    items: {
        backgroundColor: "#1f3640",
        color: "white",
        fontSize: 30,
        fontWeight: "400",
        width: "80%",
    }
})
export default Board;



