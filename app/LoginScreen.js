import { Button, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
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
    return <View>
        <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur,value } }) => (
                <TextInput
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
        <Button
            title="Authenticate"
            onPress={handleSubmit(loginUser)}
        />
        <Button
            title="Sign up"
            onPress={() => router.push('SignupScreen')}
        />
    </View>;


};

export default LoginScreen;