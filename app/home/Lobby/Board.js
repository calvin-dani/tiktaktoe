
import { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { fireStoreDb } from "../../../firebaseConfig";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

const Board = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const coll = collection(fireStoreDb, "sample");
        print(coll, "COLLECTION");

        // const fetchData = async () => {
        //     try {
        //         const querySnapshot = await getDocs(coll);
        //         const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //         setData(dataList);
        //         setLoading(false);
        //     } catch (err) {
        //         setError('Failed to fetch data', err);
        //         setLoading(false);
        //     }
        // };

        // fetchData();



        const q = query(coll);
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log(documentSnapshot.id, " => ", documentSnapshot.data());
            // });
            const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
                        
                        <Text style={{ ...styles.items, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>ID</Text>
                        <Text style={{ ...styles.items, borderBottomRightRadius: 10, borderTopRightRadius: 10, borderLeftColor: "white", borderLeftWidth: 2 }}>Join</Text>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View>
                                    {/* Render each item as a row in your table */}
                                    <Text>{item.id}</Text>
                                    {/* Other fields */}
                                </View>
                            )}
                        />
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



