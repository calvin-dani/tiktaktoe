
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { Link } from 'expo-router';
const HomeScreen = () => {

    return (
        <View style={styles.mainContainer}>
            <View style={{...styles.heading,flexDirection:"row"}}>
                <Text style={{...styles.xo,color:"#37c5c1"}}>X</Text>
                <Text style={{...styles.xo,color:"#f5b63c"}}>O</Text>
                <Text style={{...styles.xo,color:"#37c5c1"}}>X</Text>
                <Text style={{...styles.xo,color:"#f5b63c"}}>O</Text>
                </View>
            <View style={styles.menu}>
                <View style={styles.menuItems}>
            <Link style={{color:"white",fontSize:20,fontWeight:900}} href="home/Game/TikTakToe">Tik Tak Toe</Link>
                </View>
                <View style={styles.menuItems}>
            <Link style={{color:"white",fontSize:20,fontWeight:900}} href="home/Game/TikTakToest">Tik Tak Toest</Link>
                </View>
                <View style={styles.menuItems}>
            <Link style={{color:"white",fontSize:20,fontWeight:900}} href="home/Lobby/Board">Lobby</Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
     height:"100%",
     width:"100%",
     alignItems:"center",
     justifyContent:"center",
     paddingVertical:"20%",
     backgroundColor:"#192a32"
    },
    heading:{
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    padding:20,
    borderRadius:10,
    marginVertical:"10%",
    color:"white",
    fontWeight:"900",
    fontSize:20
    },
    xo:{
        fontSize:35,
        padding:3,
        fontWeight:"900"
       },
    menu:{
        height:"100%",
       width:"90%"
    },
    menuItems:{
        backgroundColor:"#1f3640",
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
    }

})
export default HomeScreen;