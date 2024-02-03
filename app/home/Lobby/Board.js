import { useState ,useEffect } from "react";
import { View, Text, Button, ActivityIndicator,FlatList } from "react-native";
import { fireStoreDb } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Board = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
    const coll = collection(fireStoreDb, "sample");
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(coll);
          const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
          setData(dataList);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch data',err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
  
    if (error) {
      return <Text>Error: {error} {fireStoreDb}</Text>;
    }
  
    return (
      <View>
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
    );
}

export default Board;