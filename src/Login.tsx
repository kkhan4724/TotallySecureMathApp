import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';

/* Security Fix: Using SHA-256 hashing */
import CryptoJS from 'crypto-js';


export interface IUser {
    username: string;
    password: string;  // Stores hashed passwords
}

interface IProps {
    onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

/* Security Fix: Hash function using SHA-256 + salt */
function hashPassword(password: string, salt: string = "secure_salt") {
    return CryptoJS.SHA256(password + salt).toString();
}

export default function Login(props: TProps) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    /* Security Fix: Storing passwords in a hashed format */
    const users: IUser[] = [
        { username: 'joe', password: hashPassword('secret') },
        { username: 'bob', password: hashPassword('password') },
    ];

    function login() {
        let foundUser: IUser | false = false;

        for (const user of users) {
            /* Security Fix: Compare hashed passwords */
            if (username === user.username && user.password === hashPassword(password)) {
                foundUser = user;
                break;
            }
        }

        if (foundUser) {
            props.onLogin(foundUser);
        } else {
            Alert.alert('Error', 'Username or password is invalid.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.username}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.password}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Login" onPress={login} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    username: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    password: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    }
});
