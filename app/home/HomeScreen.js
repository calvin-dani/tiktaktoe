import { View, Text, Button } from "react-native";
import { Link } from 'expo-router';
const HomeScreen = () => {
    return (
        <View>
            <Text>"h1 home"</Text>
            <Link href="home/Game/TikTakToe">Tik Tak Toe</Link>

            <Link href="home/Game/TikTakToest">Tik Tak Toest</Link>

            <Link href="home/Lobby/Board">Lobby</Link>

        </View>
    );
}

export default HomeScreen;