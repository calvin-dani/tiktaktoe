import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

// Define your validation schema using zod



const SignUpScreen = () => {
    const [error, setError] = useState(null);

    const auth = getAuth();
    const createAccount = async (data) => {
        try {
            const email = data.username;
            const password = data.password;
            console.log("data", email, password);

            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('home/HomeScreen');

            }).catch((error) => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    setError('Your email or password was incorrect');
                } else if (error.code === 'auth/email-already-in-use') {
                    setError('An account with this email already exists');
                } else {
                    console.log(error);
                    setError('There was a problem with your request');
                }
            });
        } catch (e) {
            setError('There was a problem creating your account');
        }
    };

    // const signUpSchema = z.object({
    //     // username: z.string(),
    //     // password: z.string().min(6, 'Password must be at least 6 characters'),
    // });


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

    return (
        <View style={styles.mainContainer}>
            <View style={{ ...styles.heading, flexDirection: "row" }}>
                <Text style={{ ...styles.xo, color: "#37c5c1" }}>X</Text>
                <Text style={{ ...styles.xo, color: "#f5b63c" }}>O</Text>
                <Text style={{ ...styles.xo, color: "#37c5c1" }}>X</Text>
                <Text style={{ ...styles.xo, color: "#f5b63c" }}>O</Text>
            </View>
            <Controller
                control={control}
                name="username"
                render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                    style={styles.inputText}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Username"
                    // Add styling here
                    />
                )}
            />
            {error && <Text>{error}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                    style={styles.inputText}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Password"
                        secureTextEntry
                    // Add styling here
                    />
                )}
            />
            {error && <Text>{error}</Text>}


            <View style={{ ...styles.menuItems, backgroundColor: "#5b604e" }}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: 900 }} onPress={handleSubmit(createAccount)}>Create Account</Text>
            </View>

            <View style={styles.menuItems}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: 900 }} onPress={() => router.replace('LoginScreen')}>Go To Log In </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "20%",
        backgroundColor: "#192a32"
    },
    heading: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 10,
        marginVertical: "10%",
        color: "white",
        fontWeight: "900",
        fontSize: 20
    },
    menu: {
        height: "100%",
        width: "90%"
    },
    inputText: {
        backgroundColor: "#627279",
        width: "80%",
        alignItems: "center",
        textAlign: "center",
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 1.05,
        elevation: 8
    },
    menuItems: {
        backgroundColor: "#60534e",
        width: "80%",
        alignItems: "center",
        textAlign: "center",
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 1.05,
        elevation: 8
    },
    logOut: {
        backgroundColor: "#910e04",
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 1.05,
        elevation: 8
    },
    xo:{
        fontSize:35,
        padding:3,
        fontWeight:"900"
       }
})

export default SignUpScreen;