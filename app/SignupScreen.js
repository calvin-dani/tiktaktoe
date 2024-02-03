import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
// Define your validation schema using zod



const SignUpScreen = () => {
    const [error, setError] = useState(null);
    const createAccount = async (data) => {
        console.log("data");
        try {
            const email = data.username;
            const password = data.password;
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
                    setError('There was a problem with your request');
                }
            });
        } catch (e) {
            setError('There was a problem creating your account');
        }
    };

    const signUpSchema = z.object({
        // username: z.string(),
        // password: z.string().min(6, 'Password must be at least 6 characters'),
    });


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });



    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <View>
            <Controller
                control={control}
                name="username"
                render={({ field: { value } }) => (
                    <TextInput
                        value={value}
                        placeholder="Username"
                    // Add styling here
                    />
                )}
            />
            {errors.username && <Text>{errors.username.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { value } }) => (
                    <TextInput
                        value={value}
                        placeholder="Password"
                        secureTextEntry
                    // Add styling here
                    />
                )}
            />
            {errors.password && <Text>{errors.password.message}</Text>}

            <Button title="Sign Up" onPress={handleSubmit(createAccount)} />

            <Button
                title="Login"
                onPress={() => router.push('LoginScreen')}
            />
        </View>
    );
};

export default SignUpScreen;