import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import { router , Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        //   setIsAuthenticated(!!user);
        // });
        if (isAuthenticated) {
            router.push('home/HomeScreen');
        }
        // return () => unsubscribe();
    }, [isAuthenticated]);


    const auth = getAuth();

    const loginUser = async (data) => {
        setError(null);
        console.log(data.username, data.password);
        const email = data.username;
        const password = data.password;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('home/HomeScreen');

            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    setError('Your email or password was incorrect');
                } else {
                    setError('There was a problem with your request');
                }
            });

    };



    const signUpSchema = z.object({
        username: z.string().email('Please enter a valid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });


    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     resolver: zodResolver(signUpSchema),
    // });

    
    const { control, handleSubmit } = useForm();


    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };



    // Show login screen or similar
    return <View style={styles.mainContainer}>
        <View style={{...styles.heading,flexDirection:"row"}}>
                <Text style={{...styles.xo,color:"#37c5c1"}}>X</Text>
                <Text style={{...styles.xo,color:"#f5b63c"}}>O</Text>
                <Text style={{...styles.xo,color:"#37c5c1"}}>X</Text>
                <Text style={{...styles.xo,color:"#f5b63c"}}>O</Text>
                </View>
        <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur,value } }) => (
                <TextInput
                style={styles.inputText}
                    value={value}
                    onBlur={onBlur}
            onChangeText={onChange}
                    placeholder="Username"
                // Add styling here
                />
            )}
        />
        

        <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur,value } }) => (
                <TextInput
                style={styles.inputText}
                    value={value}
                    onBlur={onBlur}
            onChangeText={onChange}
                    placeholder="Password"
                    secureTextEntry
                // Add styling here
                />
            )}
        />
        {error && <Text>{error}</Text>}
        {/* {errors.password && <Text>{errors.password.message}</Text>} */}

        {/* <LoginScreen /> */}
       
        <View style={{...styles.menuItems,backgroundColor:"#5b604e"}}>
            <Text style={{color:"white",fontSize:15,fontWeight:900}} onPress={handleSubmit(loginUser)}>Log In</Text>
                </View>
        
        <View style={styles.menuItems}>
            <Text style={{color:"white",fontSize:15,fontWeight:900}} onPress={() => router.push('SignupScreen')}>Sign Up </Text>
                </View>
    </View>;


};

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
    menu:{
        height:"100%",
       width:"90%"
    },
    inputText:{
        backgroundColor:"#627279",
    width:"80%",
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
    menuItems:{
        backgroundColor:"#60534e",
    width:"80%",
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
    logOut:{
        backgroundColor:"#910e04",
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
    xo:{
        fontSize:35,
        padding:3,
        fontWeight:"900"
       }
})

export default LoginScreen;