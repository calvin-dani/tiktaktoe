import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

const LoginScreen = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        //   setIsAuthenticated(!!user);
        // });
        if (isAuthenticated){
            router.push('home/HomeScreen');
        }
        // return () => unsubscribe();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        // Show login screen or similar
        return <View>
            {/* <LoginScreen /> */}
            <Button
                title="Authenticate"
                onPress={() => setIsAuthenticated(true)}
            />
        </View>;
    }

    return (
        <View>
            <Text>Success</Text>
        </View>
    );
};

export default LoginScreen;